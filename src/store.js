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
          type: "multiple",
          instruction: "Choose the most suitable option to fill in the blank",
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
          type: "multiple",
          instruction: "Choose the most suitable option to fill in the blank",
          text: "I'm looking forward to meeting your new boss — you've been _______ his praises ever since he arrived.",
          choices: [
            "calling",
            "singing",
            "shouting",
            "crying"
          ]
        },
        {
          id: "0f7bed5a-c4d4-448e-ba53-a4ced39467f4",
          type: "gap-filling",
          instruction: "Read the text below and think of the word which best fits each gap",
          text: `Global English exists {0} as a political and cultural reality. Many misguided theories attempt to explain why the English language should have succeeded internationally, whilst {1} have not. Is it because there is something inherently logical or beautiful about the structure of English? Does its simple grammar make it easy to learn? Such ideas are misconceived. Latin was once a major international language, {2} having a complicated grammatical structure, and English also presents learners with all manner of real difficulties, {3} least its spelling system. Ease of learning, therefore, has little to do with it. {4} all, children learn to speak their mother tongue in approximately the same period of time, {5} of their language. English has spread not {6} much for linguistic reasons, but rather because it has often found {7} in the right place, at the right time. Since the 1960s, two major developments have contributed to strengthening this global status. Firstly, in a number of countries, English is now used in addition to national or regional languages. As well as this, an electronic revolution has taken place. It is estimated that {8} the region of 80% of worldwide electronic communication is now in English.`,
        },
        {
          id: "f00a098d-23ba-4bd8-9944-3e4df0f10fda",
          type: "matching",
          instruction: "Choose from the list (A-B) for each question",
          text: "My name is Peter. I am a student. I am 19 years old. I am from London. I have 2 brothers and a sister. My father is a doctor. My mother is a teacher.",
          leftItems: [
            "How many brothers does Peter have?",
            "What does Peter do?"
          ],
          rightItems: [
            "He is a student.",
            "He has 2 brothers"
          ]
        },
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
