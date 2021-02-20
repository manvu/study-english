<template>
  <div id="chartArea" class="mt-5">
    <span class="chart">
      <apexchart
        width="500"
        type="pie"
        :options="quizzesChartOptions"
        :series="quizzesData"
      ></apexchart>
    </span>

    <span class="chart">
      <apexchart
        width="500"
        type="pie"
        :options="accuracyDataOptions"
        :series="accuracyData"
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
  data: function () {
    return {
      quizzesData: [44, 33, 12],
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
      accuracyData: [40, 30, 10, 20],
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