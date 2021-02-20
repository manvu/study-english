<template>
  <div>
    <div class="header d-flex">
      <h2>Quiz List</h2>
      <button type="button" class="mb-2 btn btn-primary">Create Quiz</button>
    </div>
    <div class="table">
      <div class="row header">
        <div class="cell">ID</div>
        <div class="cell">Course Name</div>
        <div class="cell">Active</div>
        <div class="cell">Questions</div>
        <div class="cell">Attempts</div>
        <div class="cell">Time Allowed</div>
        <div class="cell">Action</div>
      </div>

      <div class="row" v-for="quiz in quizzes" :key="quiz.quiz_id">
        <div class="cell">{{ quiz.quiz_id }}</div>
        <div class="cell">{{ quiz.course_name }}</div>
        <div class="cell">{{ quiz.is_active }}</div>
        <div class="cell">
          {{ quiz.number_of_questions }}
        </div>
        <div class="cell">{{ quiz.attempts }}</div>
        <div class="cell">{{ quiz.time_allowed }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    quizzes() {
      return this.$store.getters["quizStore/getQuizList"];
    },
  },
  created() {
    this.$store.dispatch("quizStore/getDataForTeacher").then((response) => {
      this.quizzes;
    });
  },
};
</script>

<style scoped>
body {
  margin: 0;
  background: linear-gradient(45deg, #49a09d, #5f2c82);
  font-family: sans-serif;
  font-weight: 100;

  font-weight: 400;
  color: #3b3b3b;
  -webkit-font-smoothing: antialiased;
  font-smoothing: antialiased;
  background: #2b2b2b;
}

tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
tbody td {
  position: relative;
}
tbody td:hover:before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: -9999px;
  bottom: -9999px;
  background-color: rgba(255, 255, 255, 0.2);
  z-index: -1;
}

@media screen and (max-width: 580px) {
  body {
    font-size: 16px;
    line-height: 22px;
  }
}

.wrapper {
  margin: 0 auto;
  padding: 40px;
  max-width: 800px;
}

.table {
  margin: 0 0 40px 0;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  display: table;
}
@media screen and (max-width: 580px) {
  .table {
    display: block;
  }
}

.row {
  display: table-row;
  background: #f6f6f6;
}
.row:nth-of-type(odd) {
  background: #e9e9e9;
}
.row.header {
  font-weight: 900;
  color: #ffffff;
  background: #ea6153;
}
.row.green {
  background: #27ae60;
}
.row.blue {
  background: #2980b9;
}
@media screen and (max-width: 580px) {
  .row {
    padding: 14px 0 7px;
    display: block;
  }
  .row.header {
    padding: 0;
    height: 6px;
  }
  .row.header .cell {
    display: none;
  }
  .row .cell {
    margin-bottom: 10px;
  }
  .row .cell:before {
    margin-bottom: 3px;
    content: attr(data-title);
    min-width: 98px;
    font-size: 10px;
    line-height: 10px;
    font-weight: bold;
    text-transform: uppercase;
    color: #969696;
    display: block;
  }
}

.cell {
  padding: 6px 12px;
  display: table-cell;
}
@media screen and (max-width: 580px) {
  .cell {
    padding: 2px 16px;
    display: block;
  }
}

.header {
  justify-content: space-between;
}

.header button {
  color: #fff;
  font-weight: 600;
  width: 20%;
}
</style>