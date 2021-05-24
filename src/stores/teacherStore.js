import axios from "axios";
import API_LIST from "./API_LIST";

const teacherStore = {
  namespaced: true,
  state() {
    return {
      quizzes: [],
      students: [],
      allSkills: [],
      allQuestionTypes: [],
      editQuiz: {},
      quizResult: {},
      questions: [],
      editQuestion: {},
      newQuestions: [],
      updatedQuestions: [],
      statistics: {},
    };
  },
  mutations: {
    getDataForTeacher(state, payload) {
      state.quizzes = payload.quizzes;
      state.allSkills = payload.allSkills;
      state.allQuestionTypes = payload.allQuestionTypes;
    },
    getQuizForEdit(state, payload) {
      state.editQuiz = state.quizzes.find((q) => q.quiz_id === payload.quizId);
      state.editQuiz.questions = payload.questions;
    },
    createQuiz(state, payload) {
      state.quizzes.push(payload.quiz);
    },
    updateQuiz(state, payload) {
      let quiz = state.quizzes.find((q) => q.quiz_id === payload.quiz.quiz_id);
      quiz.courseName = payload.courseName;
      quiz.description = payload.description;
      quiz.isActive = payload.isActive;
      quiz.timeAllowed = payload.timeAllowed;
      quiz.skillId = payload.skillId;
    },
    getQuestionForEdit(state, payload) {
      state.editQuestion = payload.question;
    },
    createQuestion(state, payload) {
      let newQuestion = {
        question_id: payload.question_id,
        type_id: payload.typeId,
        items: payload.items,
        question: payload.question,
        instruction: payload.instruction,
        paragraphTitle: payload.paragraphTitle,
        isActive: payload.isActive,
        correctAnswer: payload.correctAnswers,
      };
      state.newQuestions.push(newQuestion);
      state.questions.push(newQuestion);
    },
    getBoardStatisticsByQuiz(state, payload) {
      state.statistics.quizStatistics = payload.quizStatistics;
    },
    getBoardStatisticsByStudent(state, payload) {
      state.statistics.studentsStatistics = payload;
    },
    getAllStudents(state, payload) {
      state.students = payload.students;
    },
  },
  actions: {
    getDataForTeacher(context, payload = {}) {
      return axios(API_LIST.getDataForTeacher)
        .then((response) => {
          if (!response.data.error) {
            payload = response.data.response;
            context.commit("getDataForTeacher", payload);
          }

          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getQuizForEdit(context, payload) {
      const quizId = payload.quizId;

      return axios(API_LIST.getQuizForEdit(quizId))
        .then((response) => {
          if (!response.data.error) {
            const questions = response.data.response;
            payload.questions = questions;
            context.commit("getQuizForEdit", payload);
          }

          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    createQuiz(context, payload) {
      return axios(API_LIST.createQuiz(payload))
        .then((response) => {
          if (!response.data.error) {
            payload.quiz = response.data.quiz;
            context.commit("createQuiz", payload);
          }

          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    updateQuiz(context, payload) {
      return axios(API_LIST.saveQuizById(payload.quizId, payload))
        .then((response) => {
          if (!response.data.error) {
            payload.quiz = response.data.quiz;
            context.commit("updateQuiz", payload);
          }

          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getQuestionForEdit(context, payload) {
      return axios(API_LIST.getQuestionForEdit(payload.questionId))
        .then((response) => {
          if (!response.data.error) {
            let question = response.data.response;
            debugger
            payload.question = question;
            context.commit("getQuestionForEdit", payload);
          }

          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    createQuestion(context, payload) {
      return axios(API_LIST.createQuestion(payload))
        .then((response) => {
          if (!response.data.error) {
            payload.question_id = response.data.question_id;
            context.commit("createQuestion", payload);
            return "OK";
          }

          return response.data.error;
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getBoardStatisticsByQuiz(context, payload) {
      return axios(API_LIST.getBoardStatisticsByQuiz(payload.quizId, payload))
        .then((response) => {
          if (!response.data.error) {
            payload.quizStatistics = response.data.response;
            context.commit("getBoardStatisticsByQuiz", payload);
          }

          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getBoardStatisticsByStudent(context, payload) {
      return axios(
        API_LIST.getBoardStatisticsByStudent(payload.userId, payload)
      )
        .then((response) => {
          if (!response.data.error) {
            context.commit("getBoardStatisticsByStudent", {
              quizStatistics: response.data.response.quizStatistics,
              answerStatistics: response.data.response.answerStatistics,
            });
          }

          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getAllStudents(context, payload = {}) {
      console.log(API_LIST.getAllStudents);
      return axios(API_LIST.getAllStudents)
        .then((response) => {
          if (!response.data.error) {
            payload.students = response.data.response;
            context.commit("getAllStudents", payload);
          }

          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    resetRating(context, payload) {
      return axios(API_LIST.resetRating(payload.quizId))
        .then((response) => {
          if (!response.data.error) {
            return "OK";
          }

          return response.data.response;
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  getters: {
    getQuizList(state) {
      return state.quizzes;
    },
    getEditQuiz(state) {
      return state.editQuiz;
    },
    getAllQuestionTypes(state) {
      return state.allQuestionTypes;
    },
    getAllSkills(state) {
      return state.allSkills;
    },
    getQuizResult(state) {
      return state.quizResult;
    },
    getQuestionList(state) {
      return state.questions;
    },
    getEditQuestion(state) {
      return state.editQuestion;
    },
    getBoardStatisticsByQuiz(state) {
      return state.statistics.quizStatistics;
    },
    getBoardStatisticsByStudent(state) {
      return state.statistics.studentsStatistics;
    },
    getAllStudents(state) {
      return state.students;
    },
  },
};

export default teacherStore;
