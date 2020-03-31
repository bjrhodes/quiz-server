const quizStore = provider => {
    const participantStore = provider.participantStore();

    const details = async quizId => {
        return {
            teams: [],
            participants: participantStore.forQuiz(quizId),
            title: '',
            isActive: false,
        }
    }

    return { details };
}

module.exports = quizStore;
