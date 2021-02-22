import axios from "axios";
import API_LIST from "./API_LIST";

const quizStore = {
  namespaced: true,
  state() {
    return {
      quizStatistics: null,
      answerStatistics: null,
    };
  },
  mutations: {
    loadData(state, payload) {
      debugger
      state.quizStatistics = payload.quizStatistics
      state.answerStatistics = payload.answerStatistics
    },
  },
  actions: {
    loadData(context, payload) {
      return axios
        .get(process.env.VUE_APP_SERVER_ENDPOINT + API_LIST.getStatistics, {
          withCredentials: true,
          headers: {
            Authorization: !!localStorage.getItem("token")
              ? `Bearer ${localStorage.getItem("token")}`
              : "",
          },
        })
        .then((response) => {
            
          if (!response.data.error) {
            context.commit("loadData", {
              quizStatistics: response.data.quizStatistics,
              answerStatistics: response.data.answerStatistics,
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
  },
  getters: {
    getStatistics(state) {
      return {
        quizStatistics: state.quizStatistics,
        answerStatistics: state.answerStatistics,
      };
    },
  },
};

export default quizStore;
