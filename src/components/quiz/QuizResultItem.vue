<template>
  <tr>
    <td>
      <span class="question-title" >Question {{ question_id + displayedQuestionType }}</span>

      <quiz-result-sub-item
      
        v-for="(answer, i) in answers" 
        :key="i + 1"
        :sequence_id="i + 1"
        :answer="answer.user_answer === null || answer.user_answer === undefined ? null : answer.user_answer"
        :correct_answer="answer.correct_answer"
        :type_id="type_id"
        :marked="answer.marked"
        :is_correct_choice="answer.is_correct_choice"
         :choice_id="answer.choice_id"
         :choice_text="answer.choice_text"
      ></quiz-result-sub-item>
    </td>
  </tr>
</template>

<script>
import QuizResultSubItem from "./QuizResultSubItem";

export default {
  props: ["question_id", "answers", "type_id"],
  components: { QuizResultSubItem },
  computed: {
    displayedQuestionType() {
      if (this.type_id === 1) {
        return " (Multiple Choice) - Texts in bold indicate your selected options";
      } else if (this.type_id === 2) {
        return " (Gap Filling)";
      } else if (this.type_id === 3) {
        return " (Matching Question)";
      } else {
        return "";
      }
    },
  },
  created() {
  },
};
</script>

<style scoped>
td {
  border: 1px solid #ddd;

  padding: 8px;
}

tr:nth-child(even) {
  background: #23334b;
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