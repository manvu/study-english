<template>
  <div id="chartArea" class="mt-5">
    <span v-if="statistics !== null" class="chart">
      <apexchart
        width="500"
        type="pie"
        :options="statistics.quizzesChartOptions"
        :series="statistics.quizzesData"
      ></apexchart>
    </span>

    <span v-if="statistics !== null" class="chart">
      <apexchart
        width="500"
        type="pie"
        :options="statistics.accuracyDataOptions"
        :series="statistics.accuracyData"
      ></apexchart>
    </span>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data: function () {},
  computed: {
    statistics() {
      debugger
      const statistics = this.$store.getters["statisticsStore/getStatistics"];

      if (statistics.quizStatistics === null || statistics.answerStatistics === null) {
        return null
      }

      const numberOfQuizzes = statistics.quizStatistics.number_of_quizzes 
      const completedQuizzes = statistics.quizStatistics.completed
      const incompleteQuizzes = statistics.quizStatistics.incomplete
      const unattemptedQuizzes = numberOfQuizzes - (completedQuizzes + incompleteQuizzes)

      const correctAnswers = statistics.answerStatistics.correct 
      const partiallyCorrectAnswers = statistics.answerStatistics.partially_correct
      const incorrectAnswers = statistics.answerStatistics.incorrect
      const unansweredAnswers = statistics.answerStatistics.unanswered


      return {
        quizzesData: [completedQuizzes, incompleteQuizzes, unattemptedQuizzes],
        quizzesChartOptions: {
          chart: {
            width: 380,
            type: "pie",
          },
          title: {
            text: "How many quizzes have you completed?",
            align: "center",
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize: "18px",
              fontWeight: "bold",
              fontFamily: undefined,
              color: "#263238",
            },
          },
          labels: ["Completed", "Incomplete", "Not Attempted"],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
        accuracyData: [correctAnswers, partiallyCorrectAnswers, incorrectAnswers, unansweredAnswers],
        accuracyDataOptions: {
          chart: {
            width: 380,
            type: "pie",
          },
          labels: ["Correct", "Partially Correct", "Incorrect", "Unanswered"],

          title: {
            text: "How well do you perform?",
            align: "center",
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize: "18px",
              fontWeight: "bold",
              fontFamily: undefined,
              color: "#263238",
            },
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        },
      };
    },
  },
  created() {
    debugger
    this.$store.dispatch("statisticsStore/loadData").then((response) => {
      debugger
      this.statistics;
    });
  },
};
</script>

<style scoped>
#chartArea {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.chart {
  border: 1px solid #000;
}

@media screen and (max-width: 400px) {
  #chartArea {
    display: flex;
    flex-direction: column;
  }
  .chart {
    margin-top: 2rem;
  }
}

@media screen and (max-width: 768px) {
  #chartArea {
    display: flex;
    flex-direction: column;
  }
  .chart {
    margin-top: 2rem;
  }
}
</style>