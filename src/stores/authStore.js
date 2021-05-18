import axios from "axios";
import API_LIST from "./API_LIST";

const authStore = {
  namespaced: true,
  state() {
    return {
      isAuthenticated: !!localStorage.getItem("token"),
      isTeacher: !!localStorage.getItem("isTeacher"),
      authenticatedUser: localStorage.getItem("firstName") !== "null" ? localStorage.getItem("firstName") : localStorage.getItem("email"),
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
      return axios(API_LIST.login(payload))
        .then((response) => {
          debugger
          const {token, email, firstName, lastName, isTeacher} = response.data.response 
          if (!response.data.error) {
            localStorage.setItem("token", token);
            localStorage.setItem("email", email);
            localStorage.setItem("firstName", firstName);
            localStorage.setItem("lastName", lastName);
            localStorage.setItem("isTeacher", isTeacher);
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
      axios(API_LIST.register(payload)).then((response) => {
        
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
    getAuthenticatedUser(state) {
      return state.authenticatedUser;
    },
  },
};

export default authStore;
