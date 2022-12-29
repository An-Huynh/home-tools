import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  START_LOCATION,
} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    beforeEnter: (to, from) => {
      // TODO: Figure out a better way to check this.
      // eslint-disable-next-line
      // @ts-ignore
      if (!store.state.auth.isAuthenticated) {
        return true;
      } else {
        return "/";
      }
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/LoginView.vue"),
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
