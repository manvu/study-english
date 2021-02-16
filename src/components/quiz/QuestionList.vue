<template>
  <div class="container d-flex">
    <similar-quiz></similar-quiz>
    <div class="question-wrapper">
      <multiple-choice-question-item
        v-for="(question, index) in questions"
        :key="question.id"
        :id="index"
        :text="question.text"
        :choices="question.choices"
      ></multiple-choice-question-item>
    </div>
    <question-palette :questions="questions"></question-palette>
  </div>
</template>

<script>
import MultipleChoiceQuestionItem from "./question_types/multiple_choice/MultipleChoiceQuestionItem";
import QuestionPalette from "./QuestionPalette.vue";
import SimilarQuiz from './SimilarQuiz.vue';
export default {
  components: { MultipleChoiceQuestionItem, QuestionPalette, SimilarQuiz },
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