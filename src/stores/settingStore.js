import axios from "axios";
import API_LIST from "./API_LIST";

const settingStore = {
  namespaced: true,
  state() {
    return {
      user: {},
    };
  },
  mutations: {
    fetchUserInfo(state, payload) {
      state.user = payload.user;
      localStorage.setItem("email", payload.email);
      localStorage.setItem("firstName", payload.firstName);
      localStorage.setItem("lastName", payload.lastName);
    },
  },
  actions: {
    fetchUserInfo(context, payload) {
      return axios(API_LIST.getUserInfo)
        .then((response) => {
          if (!response.data.error) {
            payload.user = response.data.user;
            context.commit("fetchUserInfo", payload);
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
    saveUserInfo(context, payload) {
      return axios(API_LIST.saveUserInfo(payload))
        .then((response) => {
          if (!response.data.error) {
            payload.user = response.data.user;
            context.commit("fetchUserInfo", payload);
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
    getUser(state) {
      return state.user;
    },
  },
};

export default settingStore;
