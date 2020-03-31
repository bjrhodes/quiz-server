const clientIdsForQuiz = async (provider, quizId) => {
    const participants = await provider.participantStore().forQuiz(quizId, true);
    return participants.map(({ wsId }) => wsId).filter(Boolean);
}

module.exports = provider => quizId => {
    const wss = provider.wss();

    return async message => {
        const ids = await clientIdsForQuiz(provider, quizId);

        const broadcast = JSON.stringify(message);

        wss.clients.forEach(client => {
            if (ids.includes(client.id)) {
                client.send(broadcast);
            }
        });
    };
};
