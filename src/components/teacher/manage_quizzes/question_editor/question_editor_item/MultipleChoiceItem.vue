<template>
  <div class="form-group row">
    <div class="col-1">
      <label class="col-form-label" for="leftColumn">{{ item.choice_order }}</label>
    </div>

    <div class="col-7">
      <input
        type="text"
        class="form-control"
        placeholder="Add choice description"
        v-model="choiceText"
        @keyup="update"
        required
      />
    </div>

    <div class="col-2">
      <input type="checkbox" class="form-control" v-model="checked" @change="update" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "item", "mode"],
  data() {
    return {
      checked:
        this.mode === "create"
          ? false
          : this.item.is_correct_choice === 1
          ? true
          : false,
      choiceText: this.mode === "create" ? "" : this.item.choice_text,
    };
  },
  methods: {
    update() {
      this.$emit("update", {
        choice_id: this.id,
        choice_text: this.choiceText,
        is_correct_choice: this.checked,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>