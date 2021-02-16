<template>
  <header>
    <div id="filter" class="form-row details-wrapper">
      <div class="form-inline">
        <label>Filter by</label>
        <select name="filterBy" id="filter-by" v-model="filterBy">
          <option class="dropdown-item" href="#" value="student">
            Student
          </option>
          <option class="dropdown-item" href="#" value="quiz">Quiz</option>
        </select>
      </div>
      <div v-if="filterBy === 'student'" class="form-inline">
        <label>Student Name</label>
        <input type="text" class="form-control" placeholder="Mark..." />
      </div>
      <div v-else-if="filterBy === 'quiz'" class="form-inline">
        <label>Quiz</label>
        <select name="quizNumber" id="filter-by" v-model="quizNumber">
          <option class="dropdown-item" href="#" value="1">1</option>
          <option class="dropdown-item" href="#" value="2">2</option>
        </select>
      </div>
      <div class="form-inline">
        <label>Between dates</label>
        <input type="date" class="form-control" />
        <label>and</label>
        <input type="date" class="form-control" />
      </div>
      <div class="form-inline">
        <button @click="loadStatistics" class="btn btn-primary">Search</button>
      </div>
    </div>
  </header>
  <student-statistics
    v-if="statisticsLoadedBy === 'student'"
  ></student-statistics>
  <quiz-statistics v-else-if="statisticsLoadedBy === 'quiz'"></quiz-statistics>
</template>

<script>
import StudentStatistics from "./board_statistics/StudentStatistics";
import QuizStatistics from "./board_statistics/QuizStatistics";

export default {
  components: {
    StudentStatistics,
    QuizStatistics,
  },
  data: function () {
    return {
      filterBy: "student",
      quizNumber: 1,
      statisticsLoadedBy: "",
    };
  },
  methods: {
    loadStatistics: function () {
      this.statisticsLoadedBy = this.filterBy
      
    },
  },
};
</script>

<style scoped>
.details-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3px;
}

.details-wrapper div {
  /* flex: 1; */
  padding: 1em; /* add some padding ?*/
  text-align: center;
  /* border: 1px solid #000; */
}

.details-wrapper div:last-child {
  border: none; /* remove border ? */
}

.details-wrapper span {
  display: block;
  font-size: 24px;
  color: #000;
}

.details-wrapper p {
  font-size: 16px;
  color: #000;
}

#filter label {
  padding-left: 20px;
  padding-right: 20px;
}
</style>