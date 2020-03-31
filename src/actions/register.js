const colors = new (require('../utils/colors'));

const performAction = async (provider, { uid, quizId, peerId }, ws) => {
    const collection = provider.mongo().collection('users');
    const broadcast = provider.quizBroadcaster(quizId);

    const { value: user } = await collection.findOneAndUpdate(
        { _id: uid },
        {
            $set: { wsId: ws.id, peerId, color: colors.get() },
            $addToSet: { quizzes: quizId }
        },
        { returnNewDocument: true, upsert: true }
    );

    const quiz = provider.quizStore();

    broadcast(quiz.details(quizId));

    return { user };
};

const rejectEvent = event => {
    console.warn("Invalid event: ".JSON.stringify(event));

    throw new Error("Invalid event");
};

const validateEvent = event => event && event.uid && event.quizId && event.peerId;

module.exports = provider => async (event, ws) => validateEvent(event)
    ? performAction(provider, event, ws)
    : rejectEvent(event);
