<template>
  <div class="form-group">
    <label class="control-label" for="instruction">Gap {{ id }}</label>
    <input
      type="text"
      class="form-control col-4"
      name="active"
      v-model="answer"
    />
  </div>
</template>

<script>
export default {
    props: ["id", "response"],
    data() {
        return {
            answer: this.response
        }
    }
};
</script>

<style scoped>
label {
  font-weight: bold;
}
</style>