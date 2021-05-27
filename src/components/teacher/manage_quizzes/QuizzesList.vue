<template>
  <div v-if="!isLoading">
    <div class="header d-flex">
      <h2>Quiz List</h2>
      <button type="button" @click="createQuiz" class="mb-2 btn btn-primary">
        Create Quiz
      </button>
    </div>
    <div class="table">
      <div class="row header">
        <div class="cell">ID</div>
        <div class="cell">Course Name</div>
        <div class="cell">Active</div>
        <div class="cell">Questions</div>
        <div class="cell">Attempts</div>
        <div class="cell">Time Allowed</div>
        <div class="cell">Average Rating</div>
        <div class="cell">Action</div>
      </div>

      <div class="row" v-for="quiz in quizzes" :key="quiz.quiz_id">
        <div class="cell" data-title="ID">{{ quiz.quiz_id }}</div>
        <div class="cell" data-title="Course Name">{{ quiz.course_name }}</div>
        <div class="cell" data-title="Active">
          {{ quiz.is_active === 1 ? "Yes" : "No" }}
        </div>
        <div class="cell" data-title="Questions">
          {{ quiz.number_of_questions }}
        </div>
        <div class="cell" data-title="Attempts">{{ quiz.attempts }}</div>
        <div class="cell" data-title="Time Allowed">
          {{ quiz.time_allowed }}
        </div>
        <div class="cell" data-title="Time Allowed">
          {{ quiz.average_rating.toFixed(2) }} {{ `(${quiz.rating_count})` }}
          <font-awesome-icon
            class="button-item"
            :icon="faEraser"
            @click="resetRating(quiz.quiz_id)"
          ></font-awesome-icon>
        </div>
        <div class="cell" data-title="Action">
          <font-awesome-icon
            class="button-item"
            :icon="faEdit"
            @click="editQuiz(quiz.quiz_id)"
          ></font-awesome-icon>
          <font-awesome-icon
            class="button-item ml-2"
            :icon="faTrashAlt"
            @click="deleteQuiz(quiz.quiz_id)"
          ></font-awesome-icon>
        </div>
      </div>
    </div>
    <div v-if="pagination.totalPages !== null" class="block-27 text-center">
      <ul>
        <li><span class="page-number" @click="prevPage()">&lt;</span></li>
        <li
          :class="{ active: page === pagination.currentPage }"
          v-for="page in pagination.totalPages"
          :key="page"
        >
          <span class="page-number" @click="specificPage(page)">{{
            page
          }}</span>
        </li>
        <li><span class="page-number" @click="nextPage()">&gt;</span></li>
      </ul>
      <p class="font-italic pagination-caption">
        Showing
        <span class="badge badge-pill badge-secondary">{{
          quizzes.length
        }}</span>
        out of
        <span class="badge badge-pill badge-secondary">{{
          originalQuizzes.length
        }}</span>
        quizzes in total
      </p>
    </div>
  </div>
  <div v-else>
    <h1>Loading data...</h1>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { paginator } from "../../common/helper";

export default {
  components: { FontAwesomeIcon },
  data() {
    return {
      isLoading: true,
      quizzes: [],
      originalQuizzes: [],
      pagination: {
        currentPage: 1,
        totalPages: null,
        pagesPerPage: 10,
        nextPage: null,
        prevPage: null,
      },
    };
  },
  computed: {
    faEdit() {
      return faEdit;
    },
    faTrashAlt() {
      return faTrashAlt;
    },
    faEraser() {
      return faEraser;
    },
    latestQuizzes() {
      return this.$store.getters["teacherStore/getQuizList"];
    },
  },
  watch: {
    latestQuizzes() {
      
      this.quizzes = this.$store.getters["teacherStore/getQuizList"];
      this.originalQuizzes = this.quizzes;
      this.paginate();
    },
  },
  created() {
    this.$store.dispatch("teacherStore/getDataForTeacher").then((response) => {
      this.quizzes = this.$store.getters["teacherStore/getQuizList"];
      this.originalQuizzes = this.quizzes;
      this.isLoading = false;
      this.paginate();
    });
  },
  methods: {
    createQuiz() {
      this.$emit("toggleShowQuizEditor", { mode: "create" });
    },
    editQuiz(quizId) {
      this.$emit("toggleShowQuizEditor", { mode: "edit", quizId });
    },
    resetRating(quizId) {
      this.$store
        .dispatch("teacherStore/resetRating", { quizId: quizId })
        .then((response) => {
          if (response === "OK") {
          } else {
          }
        });
    },
    deleteQuiz: function (quizId) {
      this.$store
        .dispatch("teacherStore/deleteQuiz", { quizId })
        .then((response) => {});
    },
    paginate(currentPage, pagesPerPage) {
      const paginated = paginator(
        this.quizzes,
        currentPage || this.pagination.currentPage,
        pagesPerPage || this.pagination.pagesPerPage
      );

      this.quizzes = paginated.data;
      this.pagination.totalPages = paginated.total_pages;
      this.pagination.currentPage = paginated.page;
      this.pagination.prevPage = paginated.pre_page;
      this.pagination.nextPage = paginated.next_page;
    },
    prevPage() {
      if (this.pagination.prevPage !== null) {
        this.changePage(this.pagination.prevPage);
      }
    },
    nextPage() {
      if (this.pagination.nextPage !== null) {
        this.changePage(this.pagination.nextPage);
      }
    },
    specificPage(page) {
      if (page !== null) {
        this.changePage(page);
      }
    },
    changePage(changeTo) {
      const paginated = paginator(
        this.originalQuizzes,
        changeTo,
        this.pagination.pagesPerPage
      );

      this.quizzes = paginated.data;
      this.pagination.currentPage = paginated.page;
      this.pagination.prevPage = paginated.pre_page;
      this.pagination.nextPage = paginated.next_page;
    },
  },
};
</script>

<style scoped>
.pagination-caption {
  font-size: 18px;
}

.page-number {
  cursor: pointer;
}

.block-27 ul {
  padding: 0;
  margin: 0;
}
.block-27 ul li {
  display: inline-block;
  margin-bottom: 4px;
  font-weight: 400;
}
.block-27 ul li a,
.block-27 ul li span {
  color: gray;
  text-align: center;
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  border: 1px solid #e6e6e6;
}
.block-27 ul li.active a,
.block-27 ul li.active span {
  background: #2a265f;
  color: #fff;
  border: 1px solid transparent;
}

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

.page-number {
  cursor: pointer;
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

.button-item {
  cursor: pointer;
}
</style>