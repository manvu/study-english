const questionStore = {
    namespaced: true,
    state() {
      return {
        questions: [
          {
            id: "c364d27b-bcce-4aba-91dc-cde6201e5886",
            type: "multiple",
            instruction: "Choose the most suitable option to fill in the blank",
            text:
              "The recently discovered documents _______ credence to Professor Vaughan's interpretation of events.",
            choices: ["lend", "afford", "provide", "supply"],
          },
          {
            id: "14641705-7f78-4f06-bea1-954da7c9ea67",
            type: "multiple",
            instruction: "Choose the most suitable option to fill in the blank",
            text:
              "I'm looking forward to meeting your new boss — you've been _______ his praises ever since he arrived.",
            choices: ["calling", "singing", "shouting", "crying"],
          },
          {
            id: "0f7bed5a-c4d4-448e-ba53-a4ced39467f4",
            type: "gap-filling",
            instruction:
              "Read the text below and think of the word which best fits each gap",
            text: `Global English exists {0} as a political and cultural reality. Many misguided theories attempt to explain why the English language should have succeeded internationally, whilst {1} have not. Is it because there is something inherently logical or beautiful about the structure of English? Does its simple grammar make it easy to learn? Such ideas are misconceived. Latin was once a major international language, {2} having a complicated grammatical structure, and English also presents learners with all manner of real difficulties, {3} least its spelling system. Ease of learning, therefore, has little to do with it. {4} all, children learn to speak their mother tongue in approximately the same period of time, {5} of their language. English has spread not {6} much for linguistic reasons, but rather because it has often found {7} in the right place, at the right time. Since the 1960s, two major developments have contributed to strengthening this global status. Firstly, in a number of countries, English is now used in addition to national or regional languages. As well as this, an electronic revolution has taken place. It is estimated that {8} the region of 80% of worldwide electronic communication is now in English.`,
          },
          {
            id: "f00a098d-23ba-4bd8-9944-3e4df0f10fda",
            type: "matching",
            instruction: "Choose from the list (A-B) for each question",
            text:
              "My name is Peter. I am a student. I am 19 years old. I am from London. I have 2 brothers and a sister. My father is a doctor. My mother is a teacher.",
            leftItems: [
              "How many brothers does Peter have?",
              "What does Peter do?",
            ],
            rightItems: ["He is a student.", "He has 2 brothers"],
          },
        ],
      };
    },
    mutations: {

    },
    actions: {

    },
    getters: {
      getQuestionList(state) {
        return state.questions;
      },
    },
  };
  
  export default questionStore;
  