import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  START_LOCATION,
} from "vue-router";

import { AuthGuard, UnauthGuard } from "@/router/guards/auth-guards";
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
    beforeEnter: [UnauthGuard],
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/households",
    name: "households",
    beforeEnter: [AuthGuard],
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
