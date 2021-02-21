<template>
  <div class="form-group row">
    <div class="col-1">
      <label class="col-form-label" for="leftColumn">{{ id }}</label>
    </div>
    <div class="col-7">
      <input type="text" class="form-control" placeholder="Starting Column" v-model="leftColumnText"/>
    </div>
    <div class="col-1"></div>
    <div class="col-3">
      <select class="form-control" name="matching-options" v-model="selectedOption">
        <option v-for="option in availableOptions" :key="option.letter">{{ option.letter }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "item", "matchingItem", "availableOptions", "mode"],
  data () {
    return {
      leftColumnText: this.mode === "create" ? "" : this.item.text,
      selectedOption: this.mode === "create" ? this.matchingItem : this.item.correct_answer,
    }
  },
  created () {
    debugger
  }
};
</script>

<style scoped>
</style>