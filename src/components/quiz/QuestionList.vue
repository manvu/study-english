<template>
  <div class="container d-flex">
    <similar-quiz></similar-quiz>
    <div class="question-wrapper">
      <div v-for="(question, index) in questions" :key="question.id">
        <multiple-choice-question-item
          v-if="question.type === 'multiple'"
          :id="index"
          :text="question.text"
          :choices="question.choices"
          :instruction="question.instruction"
          :selectedOption='question.selectedOption'
        ></multiple-choice-question-item>
        <gap-filling-question-item
          v-else-if="question.type === 'gap-filling'"
                    :id="index"
          :text="question.text"
          :instruction="question.instruction"
        ></gap-filling-question-item>
        <matching-question-item v-else></matching-question-item>
      </div>
    </div>
    <question-palette :questions="questions"></question-palette>
  </div>
</template>

<script>
import MultipleChoiceQuestionItem from "./question_types/multiple_choice/MultipleChoiceQuestionItem";
import GapFillingQuestionItem from "./question_types/gap_filling/GapFillingQuestionItem";
import MatchingQuestionItem from "./question_types/matching/MatchingQuestionItem";
import QuestionPalette from "./QuestionPalette.vue";
import SimilarQuiz from "./SimilarQuiz.vue";
export default {
  components: {
    MultipleChoiceQuestionItem,
    QuestionPalette,
    SimilarQuiz,
    GapFillingQuestionItem,
    MatchingQuestionItem,
  },
  data() {
    return {
      questions: [],
    };
  },
  created() {
    this.questions = this.$store.getters.getQuestionList;
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