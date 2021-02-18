<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/home">Home</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <router-link to="/quiz">Quiz</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <router-link to="/discussion">Discussion</router-link>
          </li>
          <li class="nav-item" v-if="isAuthenticated">
            <router-link to="/statistics">Statistics</router-link>
          </li>
          <li class="nav-item" v-if="isTeacher">
            <router-link to="/teacher">Teacher Area</router-link>
          </li>
        </ul>
        <ul>
          <li v-if="!isAuthenticated">
            <router-link to="/register">Register</router-link>
          </li>
          <li v-if="!isAuthenticated">
            <router-link to="/login">Login</router-link>
          </li>

          <li v-if="isAuthenticated">
            <img
              class="profile-image"
              :src="`${publicPath}assets/images/default-profile-picture.png`"
              alt=""
            />
            Hi, Man
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Dropdown link
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <router-link class="dropdown-item" to="/settings"
                >Account Settings</router-link
              >
              <router-link class="dropdown-item" @click="signOut" to="/logout"
                >Sign out</router-link
              >
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
  created() {
    console.log(this.publicPath);
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['authStore/isAuthenticated'];
    },
    isTeacher() {
      return this.$store.getters['authStore/isTeacher'];;
    },
  },
  methods: {
    signOut() {
      this.$store.dispatch("signOut");
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: #11005c;
}

nav {
  height: 100%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

li {
  /* margin: 0 2rem; */
}

a {
  text-decoration: none;
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  color: white;
  padding: 0.5rem 1.5rem;
  display: inline-block;
}

.dropdown-menu a {
  color: #222;
}

a:hover,
a:active,
a.active {
  color: #f1a80a;
  border-color: #f1a80a;
  background-color: #1a037e;
}

.profile-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
</style>