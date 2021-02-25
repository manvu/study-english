<template>
  <div class="quiz-container">
    <div class="row">
      <similar-quiz
        id="similar-quiz"
        class="col-12 col-sm-12 col-md-3 col-lg-2 col-xl-2"
      ></similar-quiz>
      <div class="question-wrapper col-12 col-sm-12 col-md-6 col-lg-8 col-xl-8">
        <div v-for="(question, index) in questions" :key="question.id">
          <multiple-choice-question-item
            v-if="question.type_id === 1"
            :id="index"
            :text="question.question"
            :choices="question.content"
            :instruction="question.instruction"
            :selectedOption="question.selectedOption"
          ></multiple-choice-question-item>
          <gap-filling-question-item
            v-else-if="question.type_id === 2"
            :id="index"
            :text="question.question"
            :instruction="question.instruction"
            :paragraph_title="question.paragraph_title"
          ></gap-filling-question-item>
          <matching-question-item
            v-else-if="question.type_id === 3"
            :id="index"
            :text="question.question"
            :instruction="question.instruction"
            :leftItems=" question.content.filter((item) => item.column_assigned === 1) "
            :rightItems=" question.content.filter((item) => item.column_assigned === 2) "
          ></matching-question-item>
        </div>
      </div>
      <question-palette
        id="question-palette"
        class="col-12 col-sm-12 col-md-3 col-lg-2 col-xl-2"
        :questions="questions"
      ></question-palette>
    </div>
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
  computed: {
    getQuestions() {
      return this.$store.getters["questionStore/getQuestionList"];
    },
  },
  created() {
    const quizId = this.$route.params.id

    this.$store
      .dispatch("questionStore/getQuestionList", { quizId })
      .then(() => {
        this.questions = this.getQuestions;
      });
  },
};
</script>

<style scoped>
.quiz-container {
  display: flex;
  flex-direction: row;
  padding: 15px;
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .quiz-container {
    display: block;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .quiz-container {
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  .quiz-container {
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .quiz-container {
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .quiz-container {
  }
}
</style>