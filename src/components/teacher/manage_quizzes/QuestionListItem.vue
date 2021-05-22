<template>
  <div class="row">
    <div class="cell" data-title="ID">{{ quiz.question_id }}</div>
    <div class="cell" data-title="Type">{{ quiz.type_name }}</div>
    <div class="cell" data-title="Instruction">{{ quiz.instruction }}</div>
    <div class="cell" data-title="Paragraph Title">
      {{ quiz.paragraph_title }}
    </div>
    <div class="cell" data-title="Question" v-html="formattedQuestion"></div>
    <div class="cell" data-title="Active">{{ formattedActive }}</div>
    <div class="cell" data-title="Action">
      <font-awesome-icon
        class="button-item"
        :icon="faEdit"
        @click="editQuestion(quiz.question_id)"
      ></font-awesome-icon>
      <font-awesome-icon
        class="button-item ml-2"
        :icon="faTrashAlt"
        @click="removeQuestion(quiz.question_id)"
      ></font-awesome-icon>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default {
  inject: ["openQuestionEditorModal", "closeQuestionEditorModal"],
  props: ["quiz"],
  components: { FontAwesomeIcon },
  computed: {
    faEdit() {
      return faEdit;
    },
    faTrashAlt() {
      return faTrashAlt;
    },

    formattedQuestion() {
      return this.truncate(this.quiz.question, 100);
    },
    formattedActive() {
      return this.quiz.is_active ? "Yes" : "No";
    },
  },
  methods: {
    truncate: function (str, n) {
      return str.length > n ? str.substr(0, n - 1) + "&hellip;" : str;
    },
    editQuestion: function (questionId) {
      debugger
      this.openQuestionEditorModal(questionId, "edit");
    },
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

.button-item {
  cursor: pointer;
}
</style>