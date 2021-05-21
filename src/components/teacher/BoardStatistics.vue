<template>
  <header>
    <div id="filter" class="form-row details-wrapper">
      <div class="form-inline">
        <label>Filter by</label>
        <select
          name="filterBy"
          id="filter-by"
          class="form-control"
          v-model="filterBy"
        >
          <option class="dropdown-item" href="#" value="student">
            Student
          </option>
          <option class="dropdown-item" href="#" value="quiz">Quiz</option>
        </select>
      </div>
      <div v-if="filterBy === 'student'" class="form-inline">
        <label>Student Name</label>
                <select
          name="quizNumber"
          class="form-control"
          id="filter-by"
          v-model="selectedStudentId"
        >
          <option selected value="">Select a student</option>
          <option
            v-for="s in students"
            :key="s.user_id"
            :value="s.user_id"
            class="dropdown-item"
          >
            {{ `${s.user_id} - ${s.first_name}` }}
          </option>
        </select>
      </div>
      <div v-else-if="filterBy === 'quiz'" class="form-inline">
        <label>Quiz</label>
        <select
          name="quizNumber"
          class="form-control"
          id="filter-by"
          v-model="selectedQuizId"
        >
          <option selected value="">Select a quiz</option>
          <option
            v-for="q in quizzes"
            :key="q.quiz_id"
            :value="q.quiz_id"
            class="dropdown-item"
          >
            {{ `${q.quiz_id} - ${q.description}` }}
          </option>
        </select>
      </div>
      <div class="form-inline">
        <label>Date From:</label>
        <input type="date" class="form-control" v-model="dateFrom" />
      </div>
      <div class="form-inline">
        <label>Date To:</label>
        <input type="date" class="form-control" v-model="dateTo" />
      </div>
      <div class="form-inline">
        <button @click="loadStatistics" class="btn btn-primary">
          <font-awesome-icon :icon="faSearch"></font-awesome-icon>
        </button>
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

export default {
  components: {
    StudentStatistics,
    QuizStatistics,
    FontAwesomeIcon,
  },
  created(){
    this.$store.dispatch("teacherStore/getAllStudents").then(() => {
      this.students = this.$store.getters["teacherStore/getAllStudents"]
    })
  },
  computed: {
    faSearch() {
      return faSearch;
    },
    quizzes() {
      console.log(this.$store.getters["teacherStore/getQuizList"]);
      return this.$store.getters["teacherStore/getQuizList"];
    },
  },
  data: function () {
    return {
      filterBy: "student",
      statisticsLoadedBy: "",
      dateFrom: moment().subtract(1, "months").format("YYYY-MM-DD"),
      dateTo: moment().format("YYYY-MM-DD"),
      selectedStudentId: "",
      selectedQuizId: "",
      students: []
    };
  },
  methods: {
    loadStatistics: function () {
      if (this.filterBy === "quiz") {
        this.$store
          .dispatch("teacherStore/getBoardStatisticsByQuiz", {
            dateFrom: moment(this.dateFrom).startOf('day').format(process.env.VUE_APP_DATETIME_FORMAT),
            dateTo: moment(this.dateTo).endOf('day').format(process.env.VUE_APP_DATETIME_FORMAT),
            quizId: this.selectedQuizId,
          })
          .then(() => {
            this.statisticsLoadedBy = this.filterBy;
          });
      } else {
        this.$store
          .dispatch("teacherStore/getBoardStatisticsByStudent", {
            dateFrom: moment(this.dateFrom).startOf('day').format(process.env.VUE_APP_DATETIME_FORMAT),
            dateTo: moment(this.dateTo).endOf('day').format(process.env.VUE_APP_DATETIME_FORMAT),
            userId: this.selectedStudentId,
          })
          .then(() => {
            this.statisticsLoadedBy = this.filterBy;
          });
      }
    },
  },
};
</script>

<style scoped>
.details-wrapper {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  margin-bottom: 3px;
}

.details-wrapper div {
  /* flex: 1; */
  padding: 1em; /* add some padding ?*/
  /* text-align: center; */
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
  font-weight: bold;
  /* padding-left: 20px; */
  padding-right: 20px;
}
</style>