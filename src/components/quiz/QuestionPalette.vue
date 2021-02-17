<template>
  <div class="bg-light border-right" id="sidebar-wrapper">
    <div class="sidebar-heading">
      <h4><span>
        <font-awesome-icon :icon="faClock"></font-awesome-icon>
      </span> 45 minutes</h4>
    </div>

    <div class="sidebar-heading mt-3">
      <h4><span><font-awesome-icon :icon="faBars"></font-awesome-icon> </span>
      Question Palette</h4>
    </div>

    <div class="row mt-3 mb-3">
      <div v-for="(q,index) in questions" :key="index" :class="letterClass">{{ index + 1 }}</div>
    </div>
    <div>
      <button class="btn btn-primary"><font-awesome-icon :icon="faPaperPlane"></font-awesome-icon> Submit </button>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

export default {
  props: ["questions"],
  components: { FontAwesomeIcon },
  computed: {
    faBars() {
      return faBars;
    },
    faClock() {
      return faClock;
    },
    faPaperPlane() {
      return faPaperPlane;
    },
    letterClass() {
      return {
        letter: true,
        // "letter-selected": this.id === this.selectedOption,
      };
    },
  },
  setup() {
    return {};
  },
};
</script>

<style scoped>
/*!
 * Start Bootstrap - Simple Sidebar (https://startbootstrap.com/template/simple-sidebar)
 * Copyright 2013-2020 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
 */

#wrapper {
  overflow-x: hidden;
}

#sidebar-wrapper {
  width: 20rem;
  min-height: 100vh;
  margin-left: -15rem;
  -webkit-transition: margin 0.25s ease-out;
  -moz-transition: margin 0.25s ease-out;
  -o-transition: margin 0.25s ease-out;
  transition: margin 0.25s ease-out;
}

#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
}

#page-content-wrapper {
  min-width: 100vw;
}

#wrapper.toggled #sidebar-wrapper {
  margin-left: 0;
}

#sidebar-wrapper .list-group {
  width: 15rem;
  display: flex;
  justify-content: space-between;
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: -15rem;
  }
}

.letter {
  width: 40px;
  height: 40px;
  background-color: #3498db;
  text-align: center;
  margin: 5px 10px;
  border-radius: 50%;
  padding-bottom: 5px;
  line-height: 40px;
  color: white;
  font-family: arial;
  font-size: 16pt;
  font-weight: 600;
}

.question-list {
  display: flex;
}

button {
  font-weight: 600;
  width: 50%;
}
</style>