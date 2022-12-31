import { createStore } from "vuex";

import authModule, { AuthState } from "@/store/modules/auth";
import homeModule, { HomeState } from "@/store/modules/home";

export interface State {
  auth: AuthState;
  home: HomeState;
}

export default createStore<State>({
  modules: {
    auth: authModule,
    home: homeModule,
  },
  getters: {},
  mutations: {},
  actions: {},
});
