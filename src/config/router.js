import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../components/nav/NotFound.vue";
import Home from "../components/home/Home";
import LoginPage from "../components/auth/LoginPage";
import ForgotPassword from "../components/auth/ForgotPassword";
import LogoutPage from "../components/auth/LogoutPage";
import RegisterPage from "../components/auth/RegisterPage";
import QuizPage from "../components/quiz/QuizPage";
import QuizResult from "../components/quiz/QuizResult";
import DiscussionForum from "../components/discussion/DiscussionForum";
import ThreadView from "../components/discussion/ThreadView";
import CreateThread from "../components/discussion/CreateThread";
import TeacherPage from "../components/teacher/TeacherPage";
import StudentStatistics from "../components/statistics/StudentStatistics";
import AccountSettings from "../components/settings/AccountSettings";

const router = createRouter({
  mode: "history",
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", name: "home", component: Home },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
      meta: {
        guest: true,
      },
    },
    {
      path: "/forgotPassword",
      name: "forgotPassword",
      component: ForgotPassword,
      meta: {
        guest: true,
      },
    },
    { path: "/logout", name: "logout", component: LogoutPage },
    { path: "/thread/:id", name: "threads.index", component: ThreadView },
    {
      path: "/register",
      name: "register",
      component: RegisterPage,
      meta: {
        guest: true,
      },
    },
    {
      path: "/quiz",
      name: "quizzes",
      component: QuizPage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/quiz/:id",
      name: "quizzes.index",
      component: QuizPage,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/quiz-result",
      name: "quiz-result",
      component: QuizResult,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/discussion",
      name: "discussion",
      component: DiscussionForum,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/discussion/filter",
      name: "discussion.index",
      component: DiscussionForum,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/create-thread",
      name: "threads.create",
      component: CreateThread,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/statistics",
      name: "statistics",
      component: StudentStatistics,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/teacher",
      name: "teacher",
      component: TeacherPage,
      meta: {
        requiresAuth: true,
        isTeacher: true,
      },
    },
    {
      path: "/settings",
      name: "settings",
      component: AccountSettings,
      meta: {
        requiresAuth: true,
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

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("token") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      let isTeacher = JSON.parse(localStorage.getItem("isTeacher"));
      if (to.matched.some((record) => record.meta.isTeacher)) {
        if (isTeacher === true) {
          next();
        } else {
          next({ name: "home" });
        }
      } else {
        next();
      }
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (localStorage.getItem("token") == null) {
      next();
    } else {
      next({ name: "home" });
    }
  } else {
    next();
  }
});

export default router;
