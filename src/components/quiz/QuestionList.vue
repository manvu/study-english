<template>
  <div class="container d-flex">
    <similar-quiz></similar-quiz>
    <div class="question-wrapper">
      <question-list-item
        v-for="(question, index) in questions"
        :key="question.id"
        :id="index"
        :text="question.text"
        :choices="question.choices"
      ></question-list-item>
    </div>
    <question-palette :questions="questions"></question-palette>
  </div>
</template>

<script>
import QuestionListItem from "./QuestionListItem.vue";
import QuestionPalette from "./QuestionPalette.vue";
import SimilarQuiz from './SimilarQuiz.vue';
export default {
  components: { QuestionListItem, QuestionPalette, SimilarQuiz },
  setup() {
    return {};
  },
  computed: {
    questions() {
      return this.$store.getters.getQuestionList;
    },
  },
};
</script>

<style scoped>
/* .question-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
} */
</style>