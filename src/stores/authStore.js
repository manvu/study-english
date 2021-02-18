const authStore = {
  namespaced: true,
  state() {
    return {
      isAuthenticated: true,
      isTeacher: true,
      authenticatedUser: "teacher",
    };
  },
  mutations: {
    login(state, payload) {
      state.isAuthenticated = true;
      state.isTeacher = true;
    },
    register(state, payload) {},
    signOut(state, payload) {
      state.isAuthenticated = false;
    },
  },
  actions: {
    login(context, payload) {
      context.commit("login", payload);
    },
    register(context, payload) {
      context.commit("register", payload);
    },
    signOut(context, payload) {
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
  },
};

export default authStore;
