const participantsStore = provider => {
    const collection = provider.mongo().collection('users');

    const forQuiz = async (quizId, fullDetails = false) => {
        const options = fullDetails
            ? {}
            : { projection: ["_id", "peerId", "name"] };

        return await collection.find(
            { quizzes: quizId },
            options
        ).toArray() || [];
    }

    return { forQuiz };
}

module.exports = participantsStore;
