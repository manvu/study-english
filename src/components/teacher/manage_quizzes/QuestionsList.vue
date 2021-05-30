<template>
  <div>
    <h3>Question List</h3>
    <div class="table">
      <div class="row header">
        <div class="cell"><strong>ID</strong></div>
        <div class="cell"><strong>Type</strong></div>
        <div class="cell"><strong>Instruction</strong></div>
        <div class="cell"><strong>Paragraph Title</strong></div>
        <div class="cell"><strong>Question</strong></div>
        <div class="cell"><strong>Active</strong></div>
        <div class="cell"><strong>Action</strong></div>
      </div>

      <question-list-item v-for="q in questions" :key="q.question_id" :question="q"></question-list-item>
    </div>
  </div>
</template>

<script>
import QuestionListItem from './QuestionListItem'

export default {
  components: { QuestionListItem },
  computed: {
    questions() {
      return this.$store.getters["teacherStore/getEditQuestions"]
    }
  },
  methods() {
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
  background: #23334b;
  color: #eee;
}
.row:nth-of-type(odd) {
    background: #0d0f13;
  color: #eee;
}
.row.header {
  color: #ffffff;
  background: #6356ca;
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