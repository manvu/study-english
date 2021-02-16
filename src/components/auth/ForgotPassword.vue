<template>
  <div id="bg">
    <div class="module">
      <form @submit.prevent="forgotPassword" class="form">
        <h2 class="title">FORGOT PASSWORD?</h2>
        <input
          type="text"
          placeholder="Enter Email Address"
          class="textbox"
          v-model="email"
        />
        <input type="submit" value="Resend Email" class="button green-button" />
        <!-- <input type="checkbox" name="remember-password"/> 
        <label for="remember-password">Remember passwored</label> -->
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
    forgotPassword() {
      let isEmailValid = this.validateEmail(this.email)
      console.log(isEmailValid)
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
  display: block;
  color: #ad5482;
  text-decoration: none;
  font-weight: bold;
  /* margin-top: 40px; */
  text-align: center;
}

#bg {
  position: relative;
  top: 20px;
  height: 350px;
  width: 800px;
  /* background: url("https://i.imgur.com/3eP9Z4O.png") center no-repeat; */
  background-size: cover;
  margin-left: auto;
  margin-right: auto;
  /* border: #fff 15px solid; */
}

.module {
  position: relative;
  top: 15%;
  height: 80%;
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