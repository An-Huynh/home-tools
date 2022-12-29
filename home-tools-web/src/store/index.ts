import { createStore } from "vuex";
import authModule, { AuthState } from "@/store/modules/auth";

export interface State {
  auth: AuthState;
}

export default createStore<State>({
  modules: {
    auth: authModule,
  },
  getters: {},
  mutations: {},
  actions: {},
});
