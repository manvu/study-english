import axios from "axios";
import API_LIST from "./API_LIST";

const questionStore = {
  namespaced: true,
  state() {
    return {
      questions: [],
      editQuestion: {},
    };
  },
  mutations: {
    getQuestionList(state, payload) {
      state.questions = payload.questions;
    },
    getQuestionForEdit(state, payload) {
      state.editQuestion = state.questions.find(
        (q) => q.question_id === payload.questionId
      );
    },
  },
  actions: {
    getQuestionList(context, payload) {
      const quizId = payload.quizId;

      return axios
        .get(process.env.VUE_APP_SERVER_ENDPOINT + API_LIST.quizPage(quizId))
        .then((response) => {
          if (!response.data.error) {
            let questions = response.data.questions;
            payload.questions = questions;
            context.commit("getQuestionList", payload);
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
      context.commit("getQuestionForEdit", payload);
    },
  },
  getters: {
    getQuestionList(state) {
      return state.questions;
    },
    getEditQuestion(state) {
      return state.editQuestion;
    },
  },
};

export default questionStore;
