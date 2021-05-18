import axios from "axios";
import API_LIST from "./API_LIST";

const teacherStore = {
  namespaced: true,
  state() {
    return {
      quizzes: [],
      allSkills: [],
      allQuestionTypes: [],
      editQuiz: {},
      quizResult: {},
      questions: [],
      editQuestion: {},
      newQuestions: [],
      updatedQuestions: [],
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
      quiz.selectedSkillId = payload.selectedSkillId;
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
      state.questions.push(newQuestion)
    },
  },
  actions: {
    getDataForTeacher(context, payload) {
      return axios(API_LIST.getDataForTeacher)
        .then((response) => {
          if (!response.data.error) {
            const {quizzes, allSkills, allQuestionTypes} = response.data.response;
            context.commit("getDataForTeacher", { quizzes, allSkills, allQuestionTypes, });
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

      return axios(API_LIST.getQuizById(quizId))
        .then((response) => {
          if (!response.data.error) {
            let questions = response.data.questions;
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
            ;
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
      return axios(API_LIST.getQuestionById(payload.questionId))
        .then((response) => {
          if (!response.data.error) {
            let question = response.data.question;
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
            debugger;
            payload.question_id = response.data.question_id;
            context.commit("createQuestion", payload);
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
      return state.quizResult
    },
    getQuestionList(state) {
      return state.questions;
    },
    getEditQuestion(state) {
      return state.editQuestion;
    },
  },
};

export default teacherStore;
