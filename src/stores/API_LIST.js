const baseURL = process.env.VUE_APP_SERVER_ENDPOINT;

export default {
  login: (body) => ({ method: "post", url: "auth/login", baseURL, data: body }),
  register: (body) => ({
    method: "post",
    url: "auth/register",
    baseURL,
    data: body,
  }),

  getUsers: { method: "get", url: "users", baseURL },
  getDataForHome: { method: "get", url: "home", baseURL },
  getDataForTeacher: { method: "get", url: "teacher", baseURL },
  getDataForDiscussion: { method: "get", url: "discussion", baseURL },
  getStatistics: { method: "get", url: "statistics", baseURL },

  createThread: (body) => ({
    method: "post",
    url: "threads",
    baseURL,
    data: body,
  }),
  createPost: (body) => ({ method: "post", url: "posts", baseURL, data: body }),
  createQuiz: (body) => ({
    method: "post",
    url: "quizzes",
    baseURL,
    data: body,
  }),
  createQuestion: (body) => ({
    method: "post",
    url: "questions",
    baseURL,
    data: body,
  }),

  submitQuiz: (body) => ({
    method: "post",
    url: "quizzes/submit",
    baseURL,
    data: body,
  }),

  answerQuestion: (questionId, body) => ({
    method: "put",
    url: `questions/answer/${questionId}`,
    baseURL,
    data: body,
  }),

  getUserInfo: { method: "get", url: "/users", baseURL },
  saveUserInfo: (body) => ({ method: "put", url: "/users", baseURL, data: body }),

  updateRating: (quizId, body) => ({
    method: "put",
    url: `quizzes/${quizId}/rating`,
    baseURL,
    data: body 
  }),

  toggleFavorite: (quizId) => ({
    method: "put",
    url: `quizzes/${quizId}/favorite`,
    baseURL,
  }),

  getQuizById: (quizId) => ({
    method: "post",
    url: `quizzes/start/${quizId}`,
    baseURL,
  }),

  getQuestionById: (questionId) => ({
    method: "get",
    url: `questions/${questionId}`,
    baseURL,
  }),

  getDiscussionThreadById: (threadId) => ({
    method: "get",
    url: `threads/${threadId}`,
    baseURL,
  }),

  saveQuizById: (quizId, body) => ({
    method: "put",
    url: `quizzes/${quizId}`,
    baseURL,
    data: body 
  }),

  saveQuestionById: (questionId, body) => ({
    method: "put",
    url: `questions/${questionId}`,
    baseURL,
    data: body 
  }),

  deleteQuizById: (quizId) => ({
    method: "delete",
    url: `quizzes/${quizId}`,
    baseURL,
  }),

  deleteQuestionById: (questionId) => ({
    method: "delete",
    url: `questions/${questionId}`,
    baseURL,
  }),

  getBoardStatisticsByQuiz: (questionId, body) => ({
    method: "post",
    url: `statistics/board/quiz/${questionId}`,
    baseURL,
    data: body 
  }),

  getBoardStatisticsByStudent: (userId, body) => ({
    method: "post",
    url: `statistics/board/student/${userId}`,
    baseURL,
    data: body 
  }),

  getAllStudents: {
    method: "get",
    url: `users/students/all`,
    baseURL,
  },
};
