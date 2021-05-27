<template>
  <div class="bg-light border-right" id="sidebar-wrapper" v-if="!isLoading">
    <div class="sidebar-heading"><strong>Similar Quizzes</strong></div>
    <div class="list-group list-group-flush">

      <a v-for="quiz in quizzes" :key="quiz.quiz_id" href="#" class="list-group-item list-group-item-action bg-light"
        >Quiz {{ quiz.quiz_id}} - {{ quiz.description}} </a >
    </div>
  </div>
  <div v-else>
    <h1>Loading data...</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      originalQuizzes: [],
      quizzes: [],
      isLoading: true,
    };
  },
  created() {
    this.$store.dispatch("homeStore/getDataForHome").then((response) => {
      this.originalQuizzes = this.$store.getters["homeStore/getQuizList"];
      this.originalQuizzes = this.originalQuizzes.filter(q => q.number_of_questions > 0)
      this.quizzes = this.originalQuizzes;
      console.log(this.quizzes, "similar quiz")

      // this.paginate();
      this.isLoading = false;
    });
  },
};
</script>

<style scoped>
#wrapper {
  overflow-x: hidden;
}

#sidebar-wrapper {
  min-height: 100vh;
  margin-left: -15rem;
  -webkit-transition: margin 0.25s ease-out;
  -moz-transition: margin 0.25s ease-out;
  -o-transition: margin 0.25s ease-out;
  transition: margin 0.25s ease-out;
}

#sidebar-wrapper {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
}

.sidebar-heading {
    padding-left: 0.5rem;
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
}

#sidebar-wrapper .list-group {
  width: 15rem;
}

#page-content-wrapper {
  min-width: 100vw;
}

#wrapper.toggled #sidebar-wrapper {
  margin-left: 0;
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: -15rem;
  }
}
</style>