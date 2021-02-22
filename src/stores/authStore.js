import axios from "axios";
import API_LIST from "./API_LIST";

const authStore = {
  namespaced: true,
  state() {
    return {
      isAuthenticated: !!localStorage.getItem("token"),
      isTeacher: !!localStorage.getItem("isTeacher"),
      authenticatedUser: localStorage.getItem("firstName") || localStorage.getItem("email"),
    };
  },
  mutations: {
    login(state, payload) {
      state.isAuthenticated = !!localStorage.getItem("token");
      state.isTeacher = !!localStorage.getItem("isTeacher");
      state.authenticatedUser = localStorage.getItem("firstName") || localStorage.getItem("email");
    },
    register(state, payload) {},
    signOut(state, payload) {
      state.isAuthenticated = false;
      state.isTeacher = false;
      state.authenticatedUser = null;
    },
  },
  actions: {
    login(context, payload) {
      return axios
        .post(process.env.VUE_APP_SERVER_ENDPOINT + API_LIST.login, {
          email: payload.email,
          password: payload.password,
        }, { withCredentials: true })
        .then((response) => {
          
          if (!response.data.error) {
            localStorage.setItem("email", response.data.email);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("firstName", response.data.userInfo.firstName);
            localStorage.setItem("lastName", response.data.userInfo.lastName);
            localStorage.setItem("isTeacher", response.data.userInfo.isTeacher);
          }

          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => {
          this.loading = false;
          context.commit("login", payload);
        });
    },
    register(context, payload) {
      axios
      .post(process.env.VUE_APP_SERVER_ENDPOINT + API_LIST.register, {
        email: payload.email,
        password: payload.password,
      })
      .then((response) => {
        
        if (!response.data.error) {
          localStorage.setItem("email", payload.email);
        }

        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => {
        this.loading = false;
        context.commit("register", payload);
      });
    },
    signOut(context, payload) {
      localStorage.clear();
      context.commit("signOut", payload);
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.isAuthenticated;
    },
    isTeacher(state) {
      return state.isTeacher;
    },
    firstName(state) {
      return state.authenticatedUser;
    },
  },
};

export default authStore;
