<template>
  <quizzes-list @toggleShowQuizEditor="toggleShowQuizEditor"></quizzes-list>
  <quiz-editor v-if="showQuizEditor" :mode="mode" :quiz="quiz"></quiz-editor>
</template>

<script>
import QuizzesList from "./manage_quizzes/QuizzesList.vue";
import QuizEditor from "./manage_quizzes/QuizEditor.vue";

export default {
  data() {
    return {
      showQuizEditor: false,
      mode: null
    };
  },
  computed: {
    quiz() {
      ;
      return this.$store.getters["quizStore/getEditQuiz"];
    },
  },
  components: { QuizzesList, QuizEditor },
  methods: {
    toggleShowQuizEditor(data) {
      if (data.mode === "create") {
        this.mode = "create"
        this.showQuizEditor = !this.showQuizEditor;
        
      } else {
        this.$store
          .dispatch("quizStore/getQuizForEdit", { quizId: data.quizId })
          .then((response) => {
            this.quiz;
            this.mode = "edit"
            this.showQuizEditor = !this.showQuizEditor;
          });
      }
    },
  },
};
</script>

<style scoped>
body {
  background-color: #25274d;
}
</style>