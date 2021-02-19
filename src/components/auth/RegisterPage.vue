<template>
  <div id="bg">
    <div class="module">
      <!-- <ul>
        <li class="tab activeTab">
          <img src="https://i.imgur.com/Fk1Urva.png" alt="" class="icon" />
        </li>
        <li class="tab">
          <img src="https://i.imgur.com/ZsRgIDD.png" alt="" class="icon" />
        </li>
        <li class="tab">
          <img src="https://i.imgur.com/34Q50wo.png" alt="" class="icon" />
        </li>
        <li class="tab">
          <img src="https://i.imgur.com/LCCJ06E.png" alt="" class="icon" />
        </li>
      </ul> -->

      <form @submit.prevent="register" class="form">
        <h2 class="title">REGISTER YOUR ACCOUNT</h2>
        <input
          type="text"
          placeholder="Email Address"
          class="textbox"
          v-model="email"
        />
        <input
          type="password"
          placeholder="Password"
          class="textbox"
          v-model="password"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          class="textbox"
          v-model="confirmPassword"
        />
        <input type="submit" value="Register" class="button" />
        <router-link to="/login">Already signed up? Log in</router-link>
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
      confirmPassword: "",
    };
  },
  setup() {
    return {};
  },
  methods: {
    register() {
      this.$store.dispatch("authStore/register", {
        email: this.email,
        password: this.password,
      });

      const isAuthenticated = this.$store.getters['authStore/isAuthenticated']

      if (isAuthenticated) {
        this.$router.push({ name: "settings" });
      }
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

body {
  background-color: #f0f0f0;
  font-family: helvetica;
}

a {
  /* display: block; */
  color: #ad5482;
  text-decoration: none;
  font-weight: bold;
  /* margin-top: -5px; */
  /* text-align: center; */
}

#bg {
  position: relative;
  top: 20px;
  height: 650px;
  width: 650px;
  /* background: url("https://i.imgur.com/3eP9Z4O.png") center no-repeat; */
  background-size: cover;
  margin-left: auto;
  margin-right: auto;
  /* border: #fff 15px solid; */
}

.module {
  position: relative;
  top: 15%;
  height: 75%;
  width: 450px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 5px;
  background: RGBA(255, 255, 255, 1);

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

.activeTab {
  background: #fff;
}

.activeTab .icon {
  opacity: 1;
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
  background: #90c843;
  color: #fff;
  font-weight: bold;
  font-size: 12pt;
  transition: background 0.4s;
  cursor: pointer;
}

.button:hover {
  background: #80b438;
}

.title {
  margin-bottom: 10px;
  font-size: 28px;
}
</style>