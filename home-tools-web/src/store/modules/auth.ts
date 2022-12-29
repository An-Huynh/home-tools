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
      hasStartupLoaded: false,
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
    setHasStartupLoaded(state: AuthStoreState, loaded: boolean) {
      state.hasStartupLoaded = loaded;
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
        const userResponse = await userService.getUser(userId);

        context.commit("setUser", userResponse.data);
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
    async loadFromStore(context: ActionContext<AuthStoreState, any>) {
      try {
        const refreshToken = tokenService.getRefreshToken();
        if (!refreshToken) {
          return;
        }
        context.commit("setError", null);
        context.commit("setLoading", true);
        const loginResponse = await authService.refresh(refreshToken);
        tokenService.setTokens(
          loginResponse.data.accessToken,
          loginResponse.data.refreshToken
        );

        const { userId } = jwtDecode<{ userId: string }>(
          loginResponse.data.accessToken
        );
        const userResponse = await userService.getUser(userId);

        context.commit("setUser", userResponse.data);
        context.commit("setIsAuthenticated", true);
        context.commit("setLoading", false);
      } catch (err: any) {
        tokenService.removeTokens();
        context.commit("setError", err.message);
        context.commit("setLoading", false);
      }
      context.commit("setHasStartupLoaded", true);
    },
  },
};
