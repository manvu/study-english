export default {
    login: "auth/login",
    register: "auth/register",

    getUsers: "users",
    getDataForHome: "home",
    getDataForTeacher: "teacher",
    getDataForDiscussion: "discussion",
    getStatistics: "statistics",

    createThread: "discussion/threads/create",
    createPost: "discussion/posts/create",
    createQuiz: "quiz/create",
    createQuestion: "question/create",

    getUserInfo: "user/info",
    saveUserInfo: "user/info",
    updateRating: (quizId) => `quiz/rating/${quizId}`,

    toggleFavorite: (quizId) => `quiz/favorite/${quizId}`,
    getQuizById: (quizId) => `quiz/${quizId}`,
    getQuestionById: (questionId) => `question/${questionId}`,
    getDiscussionThreadById: (threadId) => `discussion/thread/${threadId}`,

    saveQuizById: (quizId) => `quiz/edit/${quizId}`,
    saveQuestionById: (questionId) => `question/edit/${questionId}`,

    deleteQuizById: (quizId) => `quiz/delete/${quizId}`,
    deleteQuestionById: (questionId) => `question/delete/${questionId}`,
}