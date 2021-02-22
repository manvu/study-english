import axios from "axios";
import API_LIST from "./API_LIST";

const quizStore = {
  namespaced: true,
  state() {
    return {
      quizzes: [],
      editQuiz: {},
    };
  },
  mutations: {
    toggleFavorite(state, payload) {
      let quizId = payload.id;
      let quiz = state.quizzes.find((q) => q.id === quizId);
      quiz.favorite = !quiz.favorite;
    },
    getDataForHome(state, payload) {
      state.quizzes = payload.quizzes;
    },
    getDataForTeacher(state, payload) {
      state.quizzes = payload.quizzes;
    },
    getQuizForEdit(state, payload) {
      state.editQuiz = state.quizzes.find((q) => q.quiz_id === payload.quizId);
      state.editQuiz.questions = payload.questions;
    },
  },
  actions: {
    toggleFavorite(context, payload) {
      context.commit("toggleFavorite", payload);
    },
    getDataForHome(context, payload) {
      return axios
        .get(process.env.VUE_APP_SERVER_ENDPOINT + API_LIST.getDataForHome, {
          withCredentials: true,
          headers: {
            Authorization: !!localStorage.getItem("token")
              ? `Bearer ${localStorage.getItem("token")}`
              : "",
          },
        })
        .then((response) => {
          if (!response.data.error) {
            context.commit("getDataForHome", {
              quizzes: response.data.quizzes,
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
    getDataForTeacher(context, payload) {
      return axios
        .get(process.env.VUE_APP_SERVER_ENDPOINT + API_LIST.getDataForTeacher)
        .then((response) => {
          if (!response.data.error) {
            context.commit("getDataForHome", {
              quizzes: response.data.quizzes,
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
    getQuizForEdit(context, payload) {
      const quizId = payload.quizId;

      return axios
        .get(process.env.VUE_APP_SERVER_ENDPOINT + API_LIST.getQuizById(quizId))
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
  },
  getters: {
    getQuizList(state) {
      return state.quizzes;
    },
    getEditQuiz(state) {
      return state.editQuiz;
    },
  },
};

export default quizStore;
