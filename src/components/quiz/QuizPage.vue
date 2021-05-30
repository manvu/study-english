<template>
  <div class="container">
    <div class="row quiz-container">
      <similar-quiz
        id="similar-quiz"
        class="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3"
      ></similar-quiz>

      <div
        id="quiz-content"
        class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6"
      >
        <div v-for="(question, index) in questions" :key="question.id">
          <multiple-choice-question-item
            v-if="question.type_id === 1"
            :id="index"
            :text="question.question"
            :question="question"
            :choices="question.content"
            :instruction="question.instruction"
            :selectedOption="question.selectedOption"
          ></multiple-choice-question-item>
          <gap-filling-question-item
            v-else-if="question.type_id === 2"
            :id="index"
            :text="question.question"
            :question="question"
            :instruction="question.instruction"
            :paragraph_title="question.paragraph_title"
          ></gap-filling-question-item>
          <matching-question-item
            v-else-if="question.type_id === 3"
            :id="index"
            :text="question.question"
            :question="question"
            :instruction="question.instruction"
            :leftItems="
              question.content.filter((item) => item.column_assigned === 1)
            "
            :rightItems="
              question.content.filter((item) => item.column_assigned === 2)
            "
          ></matching-question-item>
        </div>
      </div>
      <question-palette
        id="question-palette"
        v-if="quizId && !hideQuestionPalette"
        class="col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3"
        :questions="questions"
        :timer="timer"
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
      timer: {},
      hideQuestionPalette: true,
      quizId: null,
    };
  },
  created() {
    const quizId = this.$route.params.id;

    this.quizId = quizId;

    if (quizId) {
      this.$store
        .dispatch("questionStore/getQuestionList", { quizId })
        .then(() => {
          this.questions = this.$store.getters["questionStore/getQuestionList"];
          this.timer = this.$store.getters["questionStore/getTimer"];
          this.hideQuestionPalette = false;
        });
    }
  },
};
</script>

<style scoped>
#similar-quiz {
  padding-left: 0;
  padding-right: 0;
  /* position: fixed; */
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .quiz-container {
    display: flex;
    flex-direction: row;
    align-items: space-between;
  }

  #question-palette {
    position: fixed;
    left: 0;
    bottom: 0;
  }

  #similar-quiz {
    margin-bottom: 1em;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (max-width: 767px) {
  #question-palette {
    position: fixed;
    left: 0;
    bottom: 0;
  }

  #similar-quiz {
    margin-bottom: 1em;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  #question-palette {
    position: fixed;
    bottom: 0;
    right: 0;
  }
  
  .quiz-container {
    position: relative;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
}

#quiz-content {
  padding-left: 0;
  padding-right: 0;
}

#question-palette {
  padding: 20px;
  z-index: 1000;
}
</style>