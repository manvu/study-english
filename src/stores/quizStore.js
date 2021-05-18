import axios from "axios";
import API_LIST from "./API_LIST";

const quizStore = {
  namespaced: true,
  state() {
    return {
      quizzes: [],
      allSkills: [],
      allQuestionTypes: [],
      editQuiz: {},
      quizResult: {}
    };
  },
  mutations: {
    submitQuiz(state, payload) {
      state.quizResult.attempt_id = payload.attempt_id
      state.quizResult.marked = payload.marked
      state.quizResult.quiz_id = payload.quiz_id 
      state.quizResult.accuracy = payload.accuracy 
    }
  },
  actions: {
    submitQuiz(context, payload) {
      return axios(API_LIST.submitQuiz(payload))
      .then((response) => {
        debugger
        if (!response.data.error) {
          const {marked, attempt_id, quiz_id, accuracy} = response.data.response
          payload.marked = marked;
          payload.attempt_id = attempt_id;
          payload.quiz_id = quiz_id;
          payload.accuracy = accuracy;
          context.commit("submitQuiz", payload);
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
    }
  },
};

export default quizStore;
