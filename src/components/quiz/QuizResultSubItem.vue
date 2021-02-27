<template>
  <div>
    <span v-if="type_id !== 1" class="subquestion-id">{{ answer.subquestion_id }}.</span>

    {{ displayedAnswer }}

    <font-awesome-icon
      v-if="isCorrect === true"
      :icon="faCheckCircle"
      :style="{ color: 'green' }"
    ></font-awesome-icon>

    <font-awesome-icon
      v-else-if="isCorrect === false"
      :icon="faTimesCircle"
      :style="{ color: 'red' }"
    ></font-awesome-icon>

    <span v-if="isCorrect === false" class="correct-answer">&nbsp;{{ correctAnswer }}</span>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { characters } from "../shared/helper";

export default {
  components: { FontAwesomeIcon },
  computed: {
    displayedAnswer() {
      if (this.type_id === 1) {
        let answer = this.answer.answer;
        if (answer !== "") {
          return this.characters[parseInt(answer) - 1];
        } else {
          return "Unanswered";
        }
      } else {
        let answer = this.answer.answer[1];

        return answer === "?" ? "" : answer;
      }
    },
    correctAnswer() {
      if (this.type_id === 1) {
        let correct =
          this.answer.correct && this.answer.correct.length !== 0
            ? this.answer.correct[1][0]
            : this.answer.incorrect[1][0];

        return `Correct answer: ${this.characters[parseInt(correct) - 1]}`;
      } else {
        let correct =
          this.answer.correct && this.answer.correct.length !== 0
            ? this.answer.correct[1]
            : this.answer.incorrect[1];

        return `Correct answer: ${correct}`;
      }
    },
    faCheckCircle() {
      return faCheckCircle;
    },
    faTimesCircle() {
      return faTimesCircle;
    },
  },
  props: ["answer", "type_id"],
  data() {
    return {
      isCorrect:
        !this.answer.correct || this.answer.correct.length === 0 ? false : true,
    };
  },
  created() {
    this.characters = characters;
  },
};
</script>

<style  scoped>
.subquestion-id {
  font-weight: 100;
  font-size: 10pt;
}

.correct-answer {
    font-style: italic;
}
</style>