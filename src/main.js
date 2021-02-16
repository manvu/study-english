// StAuth10065: I, Man Vu, 000801665 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import store from "./store";
import App from "./App.vue";
import NotFound from "./components/nav/NotFound.vue";
import Home from "./components/Home";
import LoginPage from "./components/auth/LoginPage";
import ForgotPassword from "./components/auth/ForgotPassword";
import LogoutPage from "./components/auth/LogoutPage";
import RegisterPage from "./components/auth/RegisterPage";
import QuestionList from "./components/quiz/QuestionList";
import DiscussionForum from "./components/discussion/DiscussionForum";
import CreateTopic from "./components/discussion/CreateTopic";
import TeacherPage from "./components/teacher/TeacherPage";
import StudentStatistics from "./components/statistics/StudentStatistics";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", name: "home", component: Home },
    { path: "/login", name: "login", component: LoginPage },
    { path: "/forgotPassword", name: "forgotPassword", component: ForgotPassword },
    { path: "/logout", name: "logout", component: LogoutPage },
    {
      path: "/register",
      name: "register",
      component: RegisterPage,
      beforeEnter(to, from, next) {
        const isAuthenticated = store.getters.isAuthenticated;

        if (!isAuthenticated) {
          next();
        } else {
          next({ name: "home", query: { redirectFrom: to.fullPath } });
        }
      },
    },
    {
      path: "/quiz",
      name: "quiz",
      component: QuestionList,
      beforeEnter(to, from, next) {
        const isAuthenticated = store.getters.isAuthenticated;

        if (isAuthenticated) {
          next();
        } else {
          next({ name: "home", query: { redirectFrom: to.fullPath } });
        }
      },
    },
    {
      path: "/discussion",
      name: "discussion",
      component: DiscussionForum,
      beforeEnter(to, from, next) {
        const isAuthenticated = store.getters.isAuthenticated;

        if (isAuthenticated) {
          next();
        } else {
          next({ name: "home", query: { redirectFrom: to.fullPath } });
        }
      },
    },
    {
      path: "/create-topic",
      name: "create-topic",
      component: CreateTopic,
      beforeEnter(to, from, next) {
        const isAuthenticated = store.getters.isAuthenticated;

        if (isAuthenticated) {
          next();
        } else {
          next({ name: "home", query: { redirectFrom: to.fullPath } });
        }
      },
    },
    {
      path: "/statistics",
      name: "statistics",
      component: StudentStatistics,
      beforeEnter(to, from, next) {
        const isAuthenticated = store.getters.isAuthenticated;

        if (isAuthenticated) {
          next();
        } else {
          next({ name: "home", query: { redirectFrom: to.fullPath } });
        }
      },
    },
    {
      path: "/teacher",
      name: "teacher",
      component: TeacherPage,
      beforeEnter(to, from, next) {
        const isTeacher = store.getters.isTeacher;

        if (isTeacher) {
          next();
        } else {
          next({ name: "home", query: { redirectFrom: to.fullPath } });
        }
      },
    },
    { path: "/:notFound(.*)", component: NotFound },
  ],
  linkActiveClass: "active",
  scrollBehavior(_, _2, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
  },
});

const app = createApp(App);

app.use(store);
app.use(router);

app.mount("#app");
