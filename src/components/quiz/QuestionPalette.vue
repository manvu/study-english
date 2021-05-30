<template>
  <div class="bg-purple" id="sidebar-wrapper">
    <div class="sidebar-heading">
      <h4>
        <span>
          <font-awesome-icon :icon="faClock"></font-awesome-icon>
        </span>
        Time Left: {{ displayCountdownTimer }}
      </h4>
    </div>

    <div class="sidebar-heading mt-3">
      <h4>
        <span><font-awesome-icon :icon="faBars"></font-awesome-icon> </span>
        Question Palette
      </h4>
    </div>

    <div class="row mt-3 mb-3">
      <question-palette-item v-for="(q, index) in liveQuestions" :key="index" :number="index + 1" :question="q">
        
      </question-palette-item>
    </div>
    <div>
      <button @click="submit" class="btn btn-primary">
        <font-awesome-icon :icon="faPaperPlane"></font-awesome-icon> Submit
      </button>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import "moment-duration-format";
import QuestionPaletteItem from './QuestionPaletteItem.vue';

export default {
  props: ["questions", "timer"],
  components: { FontAwesomeIcon, QuestionPaletteItem },
  data() {
    return {
      timeLeft: 0,
      expiredTime: 0,
      interval: 1000,
      timeout: null,
    };
  },
  computed: {
    displayCountdownTimer() {
      return moment.duration(this.timeLeft, "seconds").format("hh:mm:ss");
    },
    faBars() {
      return faBars;
    },
    faClock() {
      return faClock;
    },
    faPaperPlane() {
      return faPaperPlane;
    },
    liveQuestions() {
      return this.$store.getters["questionStore/getQuestionList"]
    }
  },
  methods: {
    submit() {
      console.log(this.questions);
      this.$store
        .dispatch("quizStore/submitQuiz", {
          quizId: this.questions[0].quiz_id,
          attemptId: this.questions[0].attempt_id,
        })
        .then((response) => {
          this.$router.push({ name: "quiz-result" });
        });
    },
    countDownTimer() {
      if (this.timeLeft > 0) {
        this.timeout = setTimeout(() => {
          this.timeLeft -= 1;
          this.countDownTimer();
        }, this.interval);
      } else {
        clearTimeout(this.timeout);
        this.submit();
      }
    },
  },
  created() {
    this.timeLeft = -1 * this.timer.time_left;
    this.expiredTime = this.timer.expired_time;

    this.countDownTimer();
  },
};
</script>

<style scoped>
#wrapper {
  overflow-x: hidden;
}

.bg-purple {
  background-color: #5d51bd;
}

.bg-purple-cover:hover {
  background-color: #6355ce;
}

#sidebar-wrapper {
  width: 20rem;
  min-height: 100vh;
  margin-left: -15rem;
  -webkit-transition: margin 0.25s ease-out;
  -moz-transition: margin 0.25s ease-out;
  -o-transition: margin 0.25s ease-out;
  transition: margin 0.25s ease-out;
    padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
}

#page-content-wrapper {
  min-width: 100vw;
}

#wrapper.toggled #sidebar-wrapper {
  margin-left: 0;
}

#sidebar-wrapper .list-group {
  width: 15rem;
  display: flex;
  justify-content: space-between;
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: -15rem;
  }
}

.question-list {
  display: flex;
}

button {
  font-weight: 600;
  width: 100%;
}
</style>