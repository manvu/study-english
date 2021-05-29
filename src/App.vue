<template>
  <the-navigation></the-navigation>
  <main>
    <router-view></router-view>
  </main>
  <the-footer>
    <router-view name="footer"></router-view>
  </the-footer>
</template>

<script>
import TheNavigation from "./components/nav/TheNavigation.vue";
import TheFooter from "./components/footer/TheFooter"

// Tried to put this port number in .env file for recommended security tweaks

export default {
  components: {
    TheNavigation,
    TheFooter,
  },
  created: function () {
    
  },
  methods: {

  },
};
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
    /* font-size: 14px; */
    scroll-behavior: smooth;
}

input, select, textarea {
  background-color: #111 !important;
  color: #eee !important;
}

body {
  margin: 0;
  background-color: #1c2431;
  color: #eee;
}


</style>