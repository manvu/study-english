// StAuth10065: I, Man Vu, 000801665 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

import { createStore } from "vuex";

const authManager = {
  state() {
    return {
      isAuthenticated: true,
      isTeacher: true,
      authenticatedUser: "teacher"
    };
  },
  mutations: {
    login(state, payload) {
      state.isAuthenticated = true
      state.isTeacher = true
    },
    register(state, payload) {},
    signOut(state, payload) {
      state.isAuthenticated = false;
    }
  },
  actions: {
    login(context, payload) {
      context.commit("login", payload)
    },
    register(context, payload) {
      context.commit("register", payload)
    },
    signOut(context, payload) {
      context.commit("signOut", payload)
    }
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

const quizManager = {
  state() {
    return {
      quizzes: [
        {
          id: "a04eb213-984b-4ec5-91fa-b6eaf2223886",
          title: "Quiz 1: Listening and Reading",
          description: "Nostrud labore excepteur minim in id ullamco ex sit veniam ad fugiat minim ullamco.",
          totalChallenges: 53,
          completedChallenges: 0
        },
        {
          id: "947a86ef-e910-42bd-a9ff-afd17b5890f6",
          title: "Quiz 2: Academic Writing Task 2",
          description: "Sint exercitation nisi ex sint cillum magna labore veniam incididunt qui minim irure ipsum..",
          totalChallenges: 53,
          completedChallenges: 0
        },
        {
          id: "5469a1d7-2992-4a57-ada1-a2f5de8ac23c",
          title: "Quiz 3: Speaking - Accommodation",
          description: "Nulla sint minim aute sint.Sit nostrud labore do commodo nisi exercitation consectetur.Non nostrud ullamco qui ea officia..",
          totalChallenges: 53,
          completedChallenges: 0
        }
      ],
      questions: [
        {
          id: "c364d27b-bcce-4aba-91dc-cde6201e5886",
          text: "The recently discovered documents _______ credence to Professor Vaughan's interpretation of events.",
          choices: [
            "lend",
            "afford",
            "provide",
            "supply"
          ]
        },
        {
          id: "14641705-7f78-4f06-bea1-954da7c9ea67",
          text: "I'm looking forward to meeting your new boss — you've been _______ his praises ever since he arrived.",
          choices: [
            "calling",
            "singing",
            "shouting",
            "crying"
          ]
        }
      ]
    };
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    getQuizList(state) {
      return state.quizzes;
    },
    getQuestionList(state) {
      return state.questions
    }
  },
};

const store = createStore({
  modules: { 
    authManager, 
    quizManager },
});

export default store;
