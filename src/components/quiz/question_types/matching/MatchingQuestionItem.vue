<template>
  <div class="quiz">
    <div class="quiz-header"></div>

    <div class="instruction-wrapper">
      <h3 class="instruction">{{ id + 1 + "." }} {{ instruction }}</h3>
    </div>

    <div class="question-body">
      <div>
        <p class="question-text">{{ text }}</p>

        <div class="box-container">
          <div class="middle-box">
            <div v-for="item in rightMatchingItems" :key="item.id">
              <matching-question-right-item
                :id="item.id"
                :item="item"
              ></matching-question-right-item>
            </div>
          </div>
        </div>

        <div class="response">
          <matching-question-left-item
            v-for="item in leftMatchingItems"
            :key="item.id"
            :id="item.id"
            :item="item.item"
            :selectedOption="item.selectedOption"
            :availableOptions="rightMatchingItems"
            @updateResponse="updateResponse"
          ></matching-question-left-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MatchingQuestionRightItem from "./MatchingQuestionRightItem";
import MatchingQuestionLeftItem from "./MatchingQuestionLeftItem";

export default {
  components: { MatchingQuestionLeftItem, MatchingQuestionRightItem },
  props: ["id", "text", "instruction", "leftItems", "rightItems", "question"],
  data() {
    return {
      leftMatchingItems: [],
      rightMatchingItems: [],
      initialChar: "@",
    };
  },
  mounted() {
    let items = this.question.answer_text.split(" ").map((s) => s.split("."));

    for (let i = 0; i < this.leftItems.length; i++) {
      this.leftMatchingItems.push({
        id: i + 1,
        item: this.leftItems[i],
        selectedOption: this.question.answer_text ? (items[i][1] === "?" ? "" :  items[i][1]) : "",
      });
    }

    for (let i = 0; i < this.rightItems.length; i++) {
      this.rightMatchingItems.push({
        id: this.nextChar(),
        item: this.rightItems[i],
      });
    }
  },
  methods: {
    nextChar: function () {
      this.initialChar = String.fromCharCode(
        this.initialChar.charCodeAt(0) + 1
      );
      return this.initialChar;
    },
    updateResponse(leftIndex, response) {
      let leftItem = this.leftMatchingItems.find((g) => g.id === leftIndex);
      leftItem.selectedOption = response;

      let answerText = this.leftMatchingItems.reduce( (acc, cur) => acc + `${cur.id}.${cur.selectedOption ? cur.selectedOption : "?"} `,  "" ) .trim();

      this.$store.dispatch("questionStore/answerQuestion", {
        questionId: this.question.question_id,
        quizId: this.question.quiz_id,
        attemptId: this.question.attempt_id,
        answerText: answerText,
      });
    },
  },
};
</script>

<style scoped>
h1,
h3,
p,
ol {
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

.instruction-wrapper {
  width: 100%;
  height: auto;
  background-color: #dddddd;
  white-space: initial;
  overflow: auto;
  /* text-overflow: ellipsis; */
}
.instruction-wrapper h3,
.instruction-wrapper p,
.question-text {
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

.question-body {
  background-color: #f4f7f7;
}

.box-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.middle-box {
  border: 1px solid #111111;
  padding: 15px;
}

ol {
  margin: 1rem 1rem 1rem 1rem;
}

.response {
  padding-top: 16px;
  padding-left: 20px;
  padding-right: 20px;
}
</style>