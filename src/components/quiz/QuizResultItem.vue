<template>
  <tr>
    <td>
      {{ question_id }}. {{ user_answers }}
      <font-awesome-icon :icon="faCheckCircle" :style="{ color: 'green' }" ></font-awesome-icon>
    </td>
  </tr>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export default {
    props: ["question_id", "user_answers", "corrects", "incorrects"],
  components: { FontAwesomeIcon },
  computed: {
    faCheckCircle() {
      return faCheckCircle;
    },
    faTimesCircle() {
      return faTimesCircle;
    },
  },
};
</script>

<style scoped>
</style>