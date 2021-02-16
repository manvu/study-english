<template>
  <div class="quiz">
    <div class="quiz-header"></div>

    <div class="question">
      <h3 class="instruction">{{ id + 1 + "." }} {{ instruction }}</h3>
    </div>
    <div>
      <p><span v-html="questionText"> </span></p>
    </div>
    <div class="response">
      <gap-filling-question-gap-item
        v-for="item in gapItems"
        :key="item.id"
        :id="item.id"
        :response="item.response"
      ></gap-filling-question-gap-item>
    </div>
  </div>
</template>

<script>
import GapFillingQuestionGapItem from "./GapFillingQuestionGapItem";

const regex = /{(\d*)}/g;
export default {
  props: ["id", "text", "instruction"],
  components: {GapFillingQuestionGapItem},
  computed: {
    questionText() {
      let formattedText = this.text.replaceAll(
        regex,
        (match, p1, p2, p3, offset, string) => {
          if (p1 === "0") return "";
          else return `(${p1}) _____`;
        }
      );

      return formattedText;
    },
  },
  data() {
    return {
      gapItems: [],
    };
  },
  created() {
    let found;
    while ((found = regex.exec(this.text))) {
      let id = parseInt(found[1]);
      if (id > 0) {
        this.gapItems.push({
          id,
          response: "",
        });
      }
    }

  },
  
};
</script>

<style scoped>
h1,
h3,
p {
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
.question h3,
p {
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

.response {
  padding-top: 16px;
  padding-left: 20px;
  background-color: #f4f7f7;
}
</style>