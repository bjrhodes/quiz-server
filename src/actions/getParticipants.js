const validateEvent = event => event && event.quizId;

const rejectEvent = event => {
    console.warn("Invalid event: ".JSON.stringify(event));

    throw new Error("Invalid event");
};

const performAction = async (store, { quizId }) => {
    const participants = await store.forQuiz(quizId);

    return { participants };
};

module.exports = provider => {
    const store = provider.participantStore();

    return async event => validateEvent(event)
        ? performAction(store, event)
        : rejectEvent(event);
};
