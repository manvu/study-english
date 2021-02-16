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
import TheFooter from './footer/TheFooter.vue';

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
}



body {
  margin: 0;
}
</style>