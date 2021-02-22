import axios from "axios";
import API_LIST from "./API_LIST";

const quizStore = {
  namespaced: true,
  state() {
    return {
      threads: [],
      currentThread: {},
    };
  },
  mutations: {
    getDataForDiscussion(state, payload) {
      state.threads = payload.threads;
    },
    getDataForDiscussionThread(state, payload) {
      state.currentThread = payload.currentThread
    },
    createThread(state, payload) {
      state.currentThread = payload.currentThread
    }
  },
  actions: {
    getDataForDiscussion(context, payload) {
      return axios
        .get(
          process.env.VUE_APP_SERVER_ENDPOINT + API_LIST.getDataForDiscussion
        )
        .then((response) => {
          if (!response.data.error) {
            let threads = response.data.threads;
            payload.threads = threads;
            context.commit("getDataForDiscussion", payload);
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
    getDataForDiscussionThread(context, payload) {
      const threadId = payload.threadId

      return axios
      .get(
        process.env.VUE_APP_SERVER_ENDPOINT + API_LIST.getDiscussionThreadById(threadId)
      )
      .then((response) => {
        if (!response.data.error) {
          let currentThread = response.data.thread;
          payload.currentThread = currentThread;
          context.commit("getDataForDiscussionThread", payload);
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
    createThread(context, payload) {
      return axios
      .post(
        process.env.VUE_APP_SERVER_ENDPOINT + API_LIST.createThread, {
          threadTitle: payload.threadTitle,
          selectedRelatedQuizId: payload.selectedRelatedQuizId,
          description: payload.description,
        }, {
          headers: {
            Authorization: !!localStorage.getItem("token")
              ? `Bearer ${localStorage.getItem("token")}`
              : "",
          },
        }
      )
      .then((response) => {
        if (!response.data.error) {
          let newThreadId = response.data.newThreadId;
          payload.newThreadId = newThreadId;
          return {newThreadId}
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
    getThreads(state) {
      return state.threads;
    },
    getCurrentThread(state) {
      return state.currentThread;
    },
    getEditQuiz(state) {
      return state.editQuiz;
    },
  },
};

export default quizStore;
