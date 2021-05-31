<template>
  <quizzes-list @toggleShowQuizEditor="toggleShowQuizEditor"></quizzes-list>
  <quiz-editor
    v-if="showQuizEditor"
    @toggleShowQuizEditor="toggleShowQuizEditor"
    :mode="mode"
  ></quiz-editor>
</template>

<script>
import QuizzesList from "./manage_quizzes/QuizzesList.vue";
import QuizEditor from "./manage_quizzes/QuizEditor.vue";

export default {
  data() {
    return {
      showQuizEditor: false,
      mode: null,
    };
  },
  components: { QuizzesList, QuizEditor },
  methods: {
    toggleShowQuizEditor(data) {
      
      if (data.mode === "create") {
        this.mode = "create";

        if (data.action === "close") {
          this.showQuizEditor = false;
        } else {
          this.showQuizEditor = true;
        }
      } else {
        this.$store
          .dispatch("teacherStore/getQuizForEdit", { quizId: data.quizId })
          .then((response) => {
            this.mode = "edit";

            

            if (data.action === "close") {
              this.showQuizEditor = false;
            } else {
              this.showQuizEditor = true;
            }
          });
      }
    },
  },
};
</script>

<style scoped>
body {
  color: #eee;
  background-color: #25274d;
}
</style>