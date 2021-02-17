<template>
  <div>
    <font-awesome-icon
      class="star"
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
  props: ["favorite"],
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
      star: faStarRegular,
    };
  },
  methods: {
    toggleFavorite: function () {},
  },
  created() {
    if (this.favorite === true) {
      this.star = faStarSolid;
    }
  },
};
</script>

<style lang="scss" scoped>
</style>