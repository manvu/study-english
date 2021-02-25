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
      state.editQuestion = payload.question;
    },
    createQuestion(context, payload) {},
  },
  actions: {
    getQuestionList(context, payload) {
      const quizId = payload.quizId;

      

      return axios
        .get(process.env.VUE_APP_SERVER_ENDPOINT + API_LIST.getQuizById(quizId), {
          headers: {
            Authorization: !!localStorage.getItem("token")
              ? `Bearer ${localStorage.getItem("token")}`
              : "",
          },
        })
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
      const questionId = payload.questionId;

      return axios
        .get(
          process.env.VUE_APP_SERVER_ENDPOINT +
            API_LIST.getQuestionById(questionId)
        )
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
      return axios
        .post(
          process.env.VUE_APP_SERVER_ENDPOINT + API_LIST.createQuestion,
          {
            typeId: payload.typeId,
            items: payload.items,
            question: payload.question,
            instruction: payload.instruction,
            paragraphTitle: payload.paragraphTitle,
            isActive: payload.isActive,
            correctAnswers: payload.correctAnswers
          },
          {
            headers: {
              Authorization: !!localStorage.getItem("token")
                ? `Bearer ${localStorage.getItem("token")}`
                : "",
            },
          }
        )
        .then((response) => {
          if (!response.data.error) {
            payload.question = response.data.question;
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
    answerQuestion(context, payload) {
      return axios
      .post(
        process.env.VUE_APP_SERVER_ENDPOINT + API_LIST.answerQuestion(payload.questionId),
        {
          quizId: payload.quizId,
          attemptId: payload.attemptId,
          answerText: payload.answerText,
        },
        {
          headers: {
            Authorization: !!localStorage.getItem("token")
              ? `Bearer ${localStorage.getItem("token")}`
              : "",
          },
        }
      )
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
    }
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
