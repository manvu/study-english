<template>
  <tr>
    <td>
      <span class="question-title"
        >Question {{ question_id + displayedQuestionType }}</span
      >
      <quiz-result-sub-item
        v-for="answer in answers"
        :key="answer[0]"
        :answer="answer"
        :type_id="type_id"
      ></quiz-result-sub-item>
    </td>
  </tr>
</template>

<script>
import QuizResultSubItem from "./QuizResultSubItem";

export default {
  props: ["question_id", "user_answers", "answers", "type_id"],
  components: { QuizResultSubItem },
  computed: {
    displayedQuestionType() {
      if (this.type_id === 1) {
        return " (Multiple Choice)";
      } else if (this.type_id === 2) {
        return " (Gap Filling)";
      } else if (this.type_id === 3) {
        return " (Matching Question)";
      } else {
        return "";
      }
    },
  },
  created() {},
};
</script>

<style scoped>
td {
  border: 1px solid #ddd;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr:hover {
  background-color: #ddd;
}

td {
  padding: 15px;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4caf50;
  color: white;
}

.question-title {
  font-weight: bold;
}
</style>