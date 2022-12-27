import { createStore } from "vuex";
import authModule from "@/store/modules/auth";

export default createStore({
  modules: {
    auth: authModule,
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
});
