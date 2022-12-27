import tokenService from "@/services/token-service";
import authService from "@/services/auth-service";
import { AuthStoreState } from "@/models/auth-store-state";
import { ActionContext } from "vuex";
import { LoginCredential } from "@/models/login-credential";
import { User } from "@/models/user";
import userService from "@/services/user-service";
import jwtDecode from "jwt-decode";

export default {
  namespaced: true,
  state(): AuthStoreState {
    return {
      isAuthenticated: false,
      loading: false,
      error: null,
      user: null,
    };
  },
  mutations: {
    setIsAuthenticated(state: AuthStoreState, isAuthenticated: boolean) {
      state.isAuthenticated = isAuthenticated;
    },
    setError(state: AuthStoreState, error: string | null) {
      state.error = error;
    },
    setLoading(state: AuthStoreState, loading: boolean) {
      state.loading = loading;
    },
    setUser(state: AuthStoreState, user: User) {
      state.user = user;
    },
  },
  actions: {
    async login(
      context: ActionContext<AuthStoreState, any>,
      loginCredential: LoginCredential
    ) {
      try {
        context.commit("setError", null);
        context.commit("setLoading", true);
        const loginResponse = await authService.login(loginCredential);
        tokenService.setTokens(
          loginResponse.data.accessToken,
          loginResponse.data.refreshToken
        );

        const { userId } = jwtDecode<{ userId: string }>(
          loginResponse.data.accessToken
        );
        const user = await userService.getUser(userId);

        context.commit("setUser", user);
        context.commit("setIsAuthenticated", true);
        context.commit("setLoading", false);
      } catch (err: any) {
        context.commit("setError", err.message);
        context.commit("setLoading", false);
      }
    },
    logout(context: ActionContext<AuthStoreState, any>) {
      tokenService.removeTokens();
      context.commit("setIsAuthenticated", false);
      context.commit("setUser", null);
      context.commit("setError", null);
    },
  },
};
