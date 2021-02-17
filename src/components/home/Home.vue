<template>
  <div class="quizzes-list-container">
    <quiz-list-item 
    v-for="quiz in quizzes" 
    :key="quiz.id"
    :id="quiz.id"
    :totalChallenges="quiz.totalChallenges"
    :completedChallenges="quiz.completedChallenges"
    :title="quiz.title"
    :rating="quiz.rating"
    :ratingCount="quiz.ratingCount"
    :favorite="quiz.favorite"
    ></quiz-list-item>
  </div>
</template>

<script>
import QuizListItem from "./UI/QuizListItem.vue";
export default {
  components: { QuizListItem },
  computed: {
    quizzes() {
      console.log(this.$store.getters.getQuizList)
      return this.$store.getters.getQuizList;
    },
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