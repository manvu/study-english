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
  props: ["id", "item", "mode"],
  data() {
    return {
      checked: this.mode === "create" ? "" : (this.item.is_correct_choice === 1 ? true : false),
      choiceText: this.mode === "create" ? "" : this.item.choice_text,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>