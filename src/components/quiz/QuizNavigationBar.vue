<template>
  <div class="navbar">
    <div class="timer">Time left: 15:00</div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style  scoped>
.navbar {
  height: 60px;
  background-color: #dddddd;
  display: flex;
  justify-content: center;
}

.timer {
  padding: 20px 0;
font-family: "Muli", sans-serif;
  text-align: center;
}
</style>