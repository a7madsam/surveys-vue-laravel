import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import DefaultLayout from "../components/DefaultLayout.vue";
import AuthLayout from "../components/AuthLayout.vue";
import Surveys from "../views/Surveys.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: DefaultLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "/surveys",
        name: "surveys",
        component: Surveys,
      },
    ],
  },
  {
    path: "/auth",
    name: "auth",
    redirect: "/login",
    component: AuthLayout,
    meta: {
      isGuest: true,
    },
    children: [
      {
        path: "/login",
        name: "login",
        component: Login,
      },
      {
        path: "/register",
        name: "register",
        component: Register,
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ path: "/login" });
  } else if (store.state.user.token && to.meta.isGuest) {
    next({ path: "/dashboard" });
  } else {
    next();
  }
});

export default router;
