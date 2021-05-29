<template>
  <div id="bg">
    <div class="module">
      <form @submit.prevent="authenticate" class="form" autocomplete="on">
        <h2 class="title">LOG IN YOUR ACCOUNT</h2>
          <p class="mb-3" v-if="error">
            <b>Please correct the following error(s):</b>
            <ul>
              <li class="error-message">{{ error }}</li>
            </ul>
          </p>
        <input
          type="text"
          placeholder="Email Address"
          class="textbox"
          v-model="email"
          required
        />
        <input
          type="password"
          placeholder="Password"
          class="textbox"
          v-model="password"
          required
        />
        <input type="submit" value="Login" class="button green-button" />
        <router-link to="/forgotPassword">
          <input
            type="button"
            value="Forgot Password?"
            class="button red-button"
        /></router-link>

        <router-link to="/register">Not signed up yet? Register</router-link>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  setup() {
    return {};
  },
  methods: {
    validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    authenticate() {
      const validated = this.validateEmail(this.email);

      if (!validated) {
        this.error = "Invalid email.";
        return;
      }

      if (!this.password || this.password.length < 8) {
        this.error = "Password must be at least 8 characters.";
        return;
      }

      this.$store
        .dispatch("authStore/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          if (response === "OK") {
            this.$router.push({ name: "home" });
          } else {
            this.error = response;
          }
        });
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
}

* {
  margin: 0;
  padding: 0;
}

body {
  font-family: helvetica;
}

a {
  display: block;
  color: #f90d87;
  text-decoration: none;
  font-weight: bold;
  text-align: center;
}

#bg {
  position: relative;
  top: 20px;
  height: 700px;
  width: 800px;
  background-size: cover;
  margin-left: auto;
  margin-right: auto;
}

.module {
  position: relative;
  top: 15%;
  height: 80%;
  width: 450px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 5px;
  background-color: #6250e9 !important;

  -webkit-box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.45);
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.45);
}

.module ul {
  list-style-type: none;
  margin: 0;
}

.tab {
  float: left;
  height: 60px;
  width: 25%;
  padding-top: 20px;
  box-sizing: border-box;
  background: #eeeeee;
  text-align: center;
  cursor: pointer;
  transition: background 0.4s;
}

.tab:first-child {
  -webkit-border-radius: 5px 0px 0px 0px;
  border-radius: 5px 0px 0px 0px;
}

.tab:last-child {
  -webkit-border-radius: 0px 5px 0px 0px;
  border-radius: 0px 5px 0px 0px;
}

.tab:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.icon {
  height: 24px;
  width: 24px;
  opacity: 0.2;
}

.form {
  float: left;
  height: 86%;
  width: 100%;
  box-sizing: border-box;
  padding: 40px;
}

.textbox {
  height: 50px;
  width: 100%;
  border-radius: 3px;
  border: rgba(0, 0, 0, 0.3) 2px solid;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 30px;
}

.textbox:focus {
  outline: none;
  border: rgba(24, 149, 215, 1) 2px solid;
  color: rgba(24, 149, 215, 1);
}

.button {
  height: 50px;
  width: 100%;
  border-radius: 3px;
  border: rgba(0, 0, 0, 0.3) 0px solid;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 30px;
  color: #fff;
  font-weight: bold;
  font-size: 12pt;
  transition: background 0.4s;
  cursor: pointer;
}

.button:hover {
  background: #80b438;
}

.green-button {
  background: #90c843;
}

.green-button:hover {
  background: #80b438;
}

.red-button {
  background: #ff8080;
}

.red-button:hover {
  background: #f90e0e;
}

.title {
  margin-bottom: 10px;
}
</style>