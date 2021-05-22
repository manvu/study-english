// StAuth10065: I, Man Vu, 000801665 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

import { createApp } from "vue";
import store from "./config/store";
import App from "./App.vue";
import router from "./config/router";
import axios from "./config/axios"

console.log(process.env.VUE_APP_SERVER_ENDPOINT);

const app = createApp(App);

app.use(store);
app.use(router);

app.mount("#app");
