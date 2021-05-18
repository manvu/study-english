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
    },
    createPost(state, payload) {
      
      state.currentThread.posts.push(payload.post)
    },
  },
  actions: {
    getDataForDiscussion(context, payload) {
      return axios(API_LIST.getDataForDiscussion)
      .then((response) => {
          if (!response.data.error) {
            let threads = response.data.response;
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
      return axios(API_LIST.getDiscussionThreadById(payload.threadId))
      .then((response) => {
        if (!response.data.error) {
          let currentThread = response.data.response;
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
      return axios(API_LIST.createThread(payload))
      .then((response) => {
        if (!response.data.error) {
          let newThreadId = response.data.response.newThreadId;
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
    createPost(context, payload) {
      return axios(API_LIST.createPost(payload))
      .then((response) => {
        if (!response.data.error) {
          payload.post = response.data.post
          context.commit("createPost", payload)
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
