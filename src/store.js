// StAuth10065: I, Man Vu, 000801665 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

import { createStore } from "vuex";
import authStore from "./stores/authStore";
import quizStore from "./stores/quizStore";
import questionStore from "./stores/questionStore";
import forumStore from "./stores/forumStore";
import statisticsStore from "./stores/statisticsStore";
import settingStore from "./stores/settingStore";

const store = createStore({
  modules: {
    authStore,
    quizStore,
    questionStore,
    forumStore,
    statisticsStore,
    settingStore
  },
});

export default store;
