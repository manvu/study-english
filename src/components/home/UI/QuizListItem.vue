<template>
  <div class="course-container">
    <div class="course">
      <div class="course-preview">
        <h6>Course</h6>
        <h2>IELTS</h2>
        <quiz-list-item-rating
          :id="id"
          :rating="rating"
          :ratingCount="ratingCount"
        ></quiz-list-item-rating>
      </div>
      <div class="course-info" :class="favoriteQuiz">
        <quiz-list-item-favorite class="favorite-icon" :favorite="favorite"></quiz-list-item-favorite>
        <div class="course-info-content">
          <div class="progress-container">
            <div class="progress">
              <div class="progress--after" :style="progressBar"></div>
            </div>
            <span class="progress-text">
              {{ completedChallenges + "/" + totalChallenges }} Challenges
            </span>
          </div>
          <h6>Chapter 1</h6>
          <h2>{{ title }}</h2>
          <a href="" class="discussion-title">Discussion</a>
          <button v-if="completedChallenges > 0" class="btn">Continue</button>
          <button v-else class="btn">Start</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuizListItemRating from "./QuizListItemRating";
import QuizListItemFavorite from "./QuizListItemFavorite";

export default {
  props: [
    "totalChallenges",
    "completedChallenges",
    "title",
    "rating",
    "id",
    "favorite",
    "ratingCount",
  ],
  components: { QuizListItemRating, QuizListItemFavorite },
  computed: {
    progressBar() {
      return {
        width: (this.completedChallenges / this.totalChallenges) * 100 + "%",
      };
    },
    favoriteQuiz() {
      return {
        "course-info--yellow": this.favorite ? true : false,
      };
    },
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
.course {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  max-width: 100%;
  margin: 20px;
  overflow: hidden;
  width: 700px;

  -webkit-box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.45);
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.45);
}

.course h6 {
  opacity: 0.6;
  margin: 0;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.course h2 {
  letter-spacing: 1px;
  margin: 10px 0;
}

.course-preview {
  background-color: #2a265f;
  color: #fff;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  max-width: 290px;
  width: 290px;
}

.course-preview a {
  color: #fff;
  display: inline-block;
  font-size: 12px;
  opacity: 0.6;
  margin-top: 30px;
  text-decoration: none;
}

.course-info {
  padding: 30px;
  position: relative;
  width: 100%;
}

.course-info--yellow {
  background-color: yellow;
}

.progress-container {
  position: absolute;
  top: 30px;
  right: 30px;
  text-align: right;
  width: 150px;
}

.progress {
  background-color: #ddd;
  border-radius: 3px;
  height: 5px;
  width: 100%;
}

.progress--after {
  border-radius: 3px;
  background-color: #2a265f;
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 5px;
}

.progress-text {
  font-size: 10px;
  opacity: 0.6;
  letter-spacing: 1px;
}

.btn {
  background-color: #2a265f;
  border: 0;
  border-radius: 50px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 16px;
  padding: 12px 25px;
  position: absolute;
  bottom: 30px;
  right: 30px;
  letter-spacing: 1px;
  cursor: pointer;
}

.discussion-title {
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  padding: 12px 25px;
  position: absolute;
  bottom: 15px;
  left: 5px;
  letter-spacing: 1px;
  cursor: pointer;
}

.favorite-icon {
  position: absolute;
  top: 5px;
  right: 5px;
}
</style>