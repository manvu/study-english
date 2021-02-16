<template>
  <div>
    <h1>You have signed out successfully</h1>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
  mounted() {
      this.$router.push({ name: 'home' })
  }
};
</script>

<style lang="scss" scoped>
</style>