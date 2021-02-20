import axios from "axios";
import API_LIST from "./API_LIST";

const quizStore = {
  namespaced: true,
  state() {
    return {
      quizzes: [],
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
    }
  },
  actions: {
    toggleFavorite(context, payload) {
      context.commit("toggleFavorite", payload);
    },
    getDataForHome(context, payload) {
      const isAuthenticated = context.rootGetters["authStore/isAuthenticated"];
      const email = localStorage.getItem("email") || ""
      
      axios
        .get(process.env.VUE_APP_SERVER_ENDPOINT + API_LIST.home, {
          params: {
            email,
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
      .get(process.env.VUE_APP_SERVER_ENDPOINT + API_LIST.teacher)
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
    }
  },
  getters: {
    getQuizList(state) {
      return state.quizzes;
    },
  },
};

export default quizStore;
