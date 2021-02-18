const quizStore = {
  namespaced: true,
  state() {
    return {
      quizzes: [
        {
          id: "a04eb213-984b-4ec5-91fa-b6eaf2223886",
          title: "Quiz 1: Listening and Reading",
          description:
            "Nostrud labore excepteur minim in id ullamco ex sit veniam ad fugiat minim ullamco.",
          totalChallenges: 53,
          completedChallenges: 0,
          rating: 4.6,
          ratingCount: 23,
          favorite: false,
        },
        {
          id: "947a86ef-e910-42bd-a9ff-afd17b5890f6",
          title: "Quiz 2: Academic Writing Task 2",
          description:
            "Sint exercitation nisi ex sint cillum magna labore veniam incididunt qui minim irure ipsum..",
          totalChallenges: 53,
          completedChallenges: 25,
          rating: 3.1,
          ratingCount: 65,
          favorite: true,
        },
        {
          id: "5469a1d7-2992-4a57-ada1-a2f5de8ac23c",
          title: "Quiz 3: Speaking - Accommodation",
          description:
            "Nulla sint minim aute sint.Sit nostrud labore do commodo nisi exercitation consectetur.Non nostrud ullamco qui ea officia..",
          totalChallenges: 53,
          completedChallenges: 0,
          rating: 5,
          ratingCount: 99,
          favorite: false,
        },
      ],
    };
  },
  mutations: {
    toggleFavorite(state, payload) {
      let quizId = payload.id;
      let quiz = state.quizzes.find((q) => q.id === quizId);
      quiz.favorite = !quiz.favorite;
    },
  },
  actions: {
    toggleFavorite(context, payload) {
      context.commit("toggleFavorite", payload);
    },
  },
  getters: {
    getQuizList(state) {
      return state.quizzes;
    },
  },
};

export default quizStore;
