<template>
  <div>
    <font-awesome-icon
      class="favorite"
      :icon="star"
      @click="toggleFavorite()"
    ></font-awesome-icon>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

export default {
  components: { FontAwesomeIcon },
  props: ["favorite", "id"],
  computed: {
    faStarSolid() {
      return faStarSolid;
    },
    faStarRegular() {
      return faStarRegular;
    },
  },
  data() {
    return {
      star: this.favorite ? faStarSolid : faStarRegular,
    };
  },
  methods: {
    toggleFavorite: function () {
      
      this.$store.dispatch("quizStore/toggleFavorite", {
        id: this.id,
      });

      this.star =  faStarSolid 
    },
  },
};
</script>

<style scoped>
.favorite {
  cursor: pointer;
}
</style>