import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  START_LOCATION,
} from "vue-router";

import store from "@/store";
import HomeView from "@/views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    beforeEnter: () => {
      if (!store.state.auth.isAuthenticated) {
        return true;
      } else {
        return "/";
      }
    },
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/households",
    name: "households",
    component: () => import("@/views/HouseholdsView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  if (from === START_LOCATION) {
    await store.dispatch("auth/loadFromStore");
  }
});

export default router;
