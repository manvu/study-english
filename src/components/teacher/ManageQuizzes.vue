<template>
  <quizzes-list></quizzes-list>
  <quiz-editor></quiz-editor>
</template>

<script>
import QuizzesList from "./manage_quizzes/QuizzesList.vue";
import QuizEditor from "./manage_quizzes/QuizEditor.vue";

export default {
  components: { QuizzesList, QuizEditor },
};
</script>

<style scoped>
body {
  background-color: #25274d;
}
</style>