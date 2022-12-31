import { Home } from "@/models/home";

export interface HomeState {
  selectedHome: Home | null;
}

export default {
  namespaced: true,
  state(): HomeState {
    return {
      selectedHome: null,
    };
  },
  mutations: {
    setHome(state: HomeState, home: Home | null) {
      state.selectedHome = home;
    },
  },
};
