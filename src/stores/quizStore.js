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
    };
  },
  mutations: {
    toggleFavorite(state, payload) {
      let quizId = payload.id;
      let quiz = state.quizzes.find((q) => q.quiz_id === quizId);
      quiz.favorite = !quiz.favorite;
    },
    updateRating(state, payload) {
      let quizId = payload.id;
      let quiz = state.quizzes.find((q) => q.quiz_id === quizId);
      quiz.ratingGiven = payload.ratingGiven;
    },
    getDataForHome(state, payload) {
      state.quizzes = payload.quizzes;
    },
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
  },
  actions: {
    toggleFavorite(context, payload) {
      return axios
        .post(
          process.env.VUE_APP_SERVER_ENDPOINT + API_LIST.toggleFavorite(payload.id), {},
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
            context.commit("toggleFavorite", payload);
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
            context.commit("getDataForTeacher", {
              quizzes: response.data.quizzes,
              allSkills: response.data.allSkills,
              allQuestionTypes: response.data.allQuestionTypes,
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
    createQuiz(context, payload) {
      return axios
        .post(
          process.env.VUE_APP_SERVER_ENDPOINT + API_LIST.createQuiz,
          {
            courseName: payload.courseName,
            description: payload.description,
            isActive: payload.isActive,
            timeAllowed: payload.timeAllowed,
            selectedSkillId: payload.selectedSkillId,
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
      return axios
        .post(
          process.env.VUE_APP_SERVER_ENDPOINT +
            API_LIST.saveQuizById(payload.quizId),
          {
            courseName: payload.courseName,
            description: payload.description,
            isActive: payload.isActive,
            timeAllowed: payload.timeAllowed,
            selectedSkillId: payload.selectedSkillId,
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
    updateRating(context, payload) {
      return axios
        .post(
          process.env.VUE_APP_SERVER_ENDPOINT + API_LIST.updateRating(payload.id), {
            ratingGiven: payload.ratingGiven
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
            payload.ratingGiven = payload.updateRating
            context.commit("updateRating", payload);
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
  },
};

export default quizStore;
