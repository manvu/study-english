import axios from "axios";
import API_LIST from "./API_LIST";

const questionStore = {
  namespaced: true,
  state() {
    return {
      questions: [],
    };
  },
  mutations: {
    getQuestionList(state, payload) {
      state.questions = payload.questions;
    },
  },
  actions: {
    getQuestionList(context, payload) {
      return axios(API_LIST.getQuizById(payload.quizId))
        .then((response) => {
          if (!response.data.error) {
            let questions = response.data.response;
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
    answerQuestion(context, payload) {
      return axios(API_LIST.answerQuestion(payload))
        .then((response) => {
          if (!response.data.error) {
            // payload.question = response.data.question;
            // context.commit("createQuestion", payload);
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
    getQuestionList(state) {
      return state.questions;
    },
    getEditQuestion(state) {
      return state.editQuestion;
    },
  },
};

export default questionStore;
