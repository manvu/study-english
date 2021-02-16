<template>
  <div class="form-group row">
    <div class="col-1">
      <label class="col-form-label" for="leftColumn">{{ id }}</label>
    </div>
    <div class="col-7">
      <input type="text" class="form-control" placeholder="Left Column" v-model="leftColumnText"/>
    </div>
    <div class="col-1"></div>
    <div class="col-3">
      <select class="form-control" name="matching-options" v-model="selectedOption">
        <option v-for="option in availableOptions" :key="option.id">{{ option.id }}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id", "item", "matchingItem", "availableOptions"],
  data () {
    return {
      leftColumnText: this.item,
      selectedOption: this.matchingItem
    }
  }
};
</script>

<style scoped>
</style>