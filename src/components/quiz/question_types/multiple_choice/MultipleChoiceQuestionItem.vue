<template>
  <div class="quiz">
    <div class="quiz-header"></div>

    <div class="question">
      <h3 class="instruction">{{ id + 1 + "." }} {{ instruction }}</h3>
      <h3><span v-html="questionText"> </span></h3>
    </div>

    <multiple-choice-choice-item
      v-for="(item, index) in choices"
      :key="index"
      :id="index"
      :text="item.choice_text"
      :item="item"
      :selectedOption="selectedOption"
      @selectOption="selectOption"
    ></multiple-choice-choice-item>
  </div>
</template>

<script>
import MultipleChoiceChoiceItem from "./MultipleChoiceChoiceItem";

export default {
  components: { MultipleChoiceChoiceItem },
  watch: {
    selectedOption(state) {
      if (state !== null) {
        let underscores = this.originalQuestionText.match(/__*/g);
        this.questionText = this.originalQuestionText.replace(
          underscores,
          "<span style='color: red;'>" +
            this.choices[this.selectedOption] +
            "</span>"
        );
      }
    },
  },
  props: ["id", "text", "choices", "instruction", "question"],
  data() {
    return {
      selectedOption: this.question.answer_text ? this.question.answer_text : null,
      questionText: this.text,
      originalQuestionText: this.text,
    };
  },
  methods: {
    selectOption(option) {
      this.$store
        .dispatch("questionStore/answerQuestion", {
          questionId: this.question.question_id,
          quizId: this.question.quiz_id,
          attemptId: this.question.attempt_id,
          answerText: option,
        })
        .then((response) => {
          this.selectedOption = option;
        });
    },
  },
  created() {
    console.log(this.question.answer_text)
  }
};
</script>

<style scoped>
h1,
h3 {
  font-family: sans-serif;
}

h2 {
  font-size: 12pt;
  font-weight: 300;
  margin: 0;
  line-height: 0;
}

.quiz {
  width: 100%;
  height: auto;
  background-color: #eceeef;
  /* position: relative;
  top: 50%;
  left: 50%; */
  border-radius: 5px;
  /* transform: translate(25%, 0%); */
  -webkit-box-shadow: 0px 0px 47px 9px rgba(0, 0, 0, 0.08);
  -moz-box-shadow: 0px 0px 47px 9px rgba(0, 0, 0, 0.08);
  box-shadow: 0px 0px 47px 9px rgba(0, 0, 0, 0.08);
}
.quiz h1 {
  text-align: center;
}

.question {
  width: 100%;
  height: auto;
  background-color: #dddddd;
  white-space: initial;
  overflow: auto;
  /* text-overflow: ellipsis; */
}
.question h3 {
  padding-top: 16px;
  padding-left: 20px;
  font-size: 14pt;
  color: #1c1c1c;
}

.btn {
  border: 0;
  border-radius: 50px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  font-size: 16px;
  margin: 10px;
  padding: 12px 25px;
  /* position: relative; */
  /* left: 675px; */
  /* bottom: 30px; */
  /* right: 0px; */
  letter-spacing: 1px;
  cursor: pointer;
}

@media screen and (max-width: 400px) {
  .question h3 {
    padding-top: 0px;
  }
}

.button-control {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #dddddd;
}

@media (max-width: 768px) {
  .quiz {
    width: 100%;
  }
}

.instruction {
  font-weight: bold;
}
</style>