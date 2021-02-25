<template>
  <div>
    <div>
      <span>
        <span class="rating-number mr-1">{{ formattedRating }}</span>
        <font-awesome-icon
          class="star"
          v-for="(star, index) in stars"
          :key="index"
          :icon="star"
          @click="vote(index + 1)"
        ></font-awesome-icon>
        <span class="vote-number ml-1">({{ ratingCount }})</span>
      </span>
    </div>
    <div v-if="voted">Thanks for voting!</div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

export default {
  props: ["rating", "id", "ratingCount"],
  components: { FontAwesomeIcon },
  data() {
    return {
      stars: [
        faStarRegular,
        faStarRegular,
        faStarRegular,
        faStarRegular,
        faStarRegular,
      ],
      voted: false,
    };
  },
  computed: {
    faStarSolid() {
      return faStarSolid;
    },
    faStarRegular() {
      return faStarRegular;
    },
    faStarHalfAlt() {
      return faStarHalfAlt;
    },
    formattedRating() {
      return !!this.rating ? this.rating.toFixed(1) : this.rating;
    },
  },
  created() {
    let lastStar = this.rating % 1;
    let fullStar = parseInt(this.rating);

    let i = 0;
    for (i = 0; i < fullStar; i++) {
      this.stars[i] = this.faStarSolid;
    }

    if (lastStar === 1) {
      this.stars[i] = this.faStarSolid;
    } else if (lastStar >= 0.5) {
      this.stars[i] = this.faStarHalfAlt;
    }
  },
  methods: {
    vote(starScore) {
      this.$store
        .dispatch("quizStore/updateRating", { id: this.id, ratingGiven: starScore })
        .then((response) => {
          this.voted = true;
        });
    },
  },
};
</script>

<style scoped>
.rating-number {
  font-weight: bold;
}

.star {
  cursor: pointer;
}
</style>