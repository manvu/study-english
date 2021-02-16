<template>
  <div class="form-group">
    <label class="control-label" for="instruction">Gap {{ id + 1 }}</label>
    <input type="text" class="form-control col-4" name="active" v-model="keyAnswer" />
  </div>

</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      keyAnswer: "",
    };
  },
  methods: {
    onKeyUp: function () {
      this.$emit("updateAnswer", [this.id, this.keyAnswer]);
    },
  },
};
</script>

<style scoped>
label {
    font-weight: bold;
}
</style>