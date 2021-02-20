export default {
    login: "auth/login",
    register: "auth/register",

    getUsers: "users",
    getDataForHome: "home",
    getDataForTeacher: "teacher",

    getQuizById: (quizId) => `quiz/${quizId}`,
    getQuestionById: (questionId) => `question/${questionId}`,

    saveQuizById: (quizId) => `quiz/edit/${quizId}`,
    saveQuestionById: (questionId) => `question/edit/${questionId}`,

    deleteQuizById: (quizId) => `quiz/delete/${quizId}`,
    deleteQuestionById: (questionId) => `question/delete/${questionId}`,
}