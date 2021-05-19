<template>
  <div class="chart-area">
    <span class="chart">
      <table id="customers">
        <tr>
          <th>Student Name</th>
          <th>Date Completed</th>
          <th>Grade</th>
        </tr>
        <tr v-for="a in attempts" :key="a.end_time">
          <td>{{ a.full_name }}</td>
          <td>{{ formattedTime(a.end_time) }}</td>
          <td>{{ a.grade }}</td>
        </tr>
      </table>
    </span>
    <span class="chart">
      <p><span class="label-text">Highest score: </span> {{ maxScoreInfo }}</p>
      <p><span class="label-text">Lowest score: </span> {{ minScoreInfo }}</p>
      <p><span class="label-text">Mean score: </span> {{ avgScoreInfo }}</p>
      <apexchart
        width="500"
        type="bar"
        :options="barChart.chartOptions"
        :series="barChart.series"
      ></apexchart>
    </span>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import moment from "moment";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  computed: {
    maxScoreInfo() {
      const date = moment(this.max.end_time).format("YYYY-MMM-DD");
      return `${this.max.grade.toFixed(2)}% by ${
        this.max.full_name
      } on ${date}`;
    },
    minScoreInfo() {
      const date = moment(this.min.end_time).format("YYYY-MMM-DD");
      return `${this.min.grade.toFixed(2)}% by ${
        this.min.full_name
      } on ${date}`;
    },
    avgScoreInfo() {
      return `${this.avg.toFixed(2)}%`;
    },
  },
  created() {
    this.statistics = this.$store.getters[
      "teacherStore/getBoardStatisticsByQuiz"
    ];
    this.barChart.chartOptions.xaxis.categories = Object.keys(
      this.statistics.summary.categories
    );
    this.barChart.series = this.statistics.summary.categories;
    this.barChart.chartOptions.title.text = `Score distribution for Quiz ${this.statistics.summary.quizId}`;
    this.attempts = this.statistics.attempts;
    this.max = this.statistics.summary.max;
    this.min = this.statistics.summary.min;
    this.avg = this.statistics.summary.avg;
  },
  data() {
    return {
      barChart: {
        chartOptions: {
          chart: {
            id: "quiz-statistics-summary",
          },
          xaxis: {
            categories: [],
          },
          yaxis: [
            {
              labels: {
                formatter: function (value) {
                  return value.toFixed(0);
                },
              },
            },
          ],
          title: {
            text: "",
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
        },
        series: [],
      },
    };
  },
  methods: {
    formattedTime(endTime) {
      const date = moment(endTime).format("YYYY-MMM-DD");
      return date;
    },
  },
};
</script>

<style scoped>
.chart {
  border: 1px solid rgb(238, 207, 207);
  padding: 20px;
}

.label-text {
  font-weight: bold;
}

.chart-area {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

#customers {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#customers td,
#customers th {
  border: 1px solid #ddd;
  padding: 8px;
}

#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #4caf50;
  color: white;
}
</style>