<template>
  <div class="form-group row">
    <div class="col-1">
      <label class="col-form-label" for="leftColumn">{{ id }}</label>
    </div>

    <div class="col-7">
      <input
        type="text"
        class="form-control"
        placeholder="Matching column"
        v-model="choiceText"
      />
    </div>

    <div class="col-2">
      <input type="checkbox" class="form-control" v-model="checked" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "item"],
  data() {
    return {
      checked: false,
      choiceText: "",
    };
  },
};
</script>

<style lang="scss" scoped>
</style>