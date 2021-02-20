<template>
  <div class="quizzes-list-container">
    <quiz-list-item
      v-for="quiz in quizzes"
      :favorite="quiz.favorite"
      :key="quiz.quiz_id"
      :quiz_id="quiz.quiz_id"
      :course_name="quiz.course_name"
      :description="quiz.description"
      :is_active="quiz.is_active"
      :time_allowed="quiz.time_allowed"
      :created_by="quiz.created_by"
      :created_at="quiz.created_at"
      :skill_description="quiz.skill_description"
      :completedChallenges="0"
      :numberOfQuestions="quiz.number_of_questions"
      :averageRating="quiz.averageRating"
      :ratingCount="quiz.ratingCount"
    ></quiz-list-item>
  </div>
</template>

<script>
import QuizListItem from "./UI/QuizListItem.vue";
export default {
  components: { QuizListItem },
  computed: {
    quizzes() {
      console.log(this.$store.getters["quizStore/getQuizList"]);
      return this.$store.getters["quizStore/getQuizList"];
    },
  },
  created() {
    this.$store.dispatch("quizStore/getDataForHome");
  },
};
</script>

<style scoped>
.quizzes-list-container {
  /* background-image: linear-gradient(45deg, #7175da, #9790F2); */
  font-family: "Muli", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
}
</style>