import tokenService from "@/services/token-service";
import authService from "@/services/auth-service";
import { ActionContext } from "vuex";
import { LoginCredential } from "@/models/login-credential";
import { User } from "@/models/user";
import userService from "@/services/user-service";
import jwtDecode from "jwt-decode";
import { State } from "@/store";

export interface AuthState {
  isAuthenticated: boolean;
  error: Error | null;
  user: User | null;
  loading: boolean;
  hasStartupLoaded: boolean;
}

export default {
  namespaced: true,
  state(): AuthState {
    return {
      isAuthenticated: false,
      loading: false,
      error: null,
      user: null,
      hasStartupLoaded: false,
    };
  },
  mutations: {
    setIsAuthenticated(state: AuthState, isAuthenticated: boolean) {
      state.isAuthenticated = isAuthenticated;
    },
    setError(state: AuthState, error: Error | null) {
      state.error = error;
    },
    setLoading(state: AuthState, loading: boolean) {
      state.loading = loading;
    },
    setUser(state: AuthState, user: User) {
      state.user = user;
    },
    setHasStartupLoaded(state: AuthState, loaded: boolean) {
      state.hasStartupLoaded = loaded;
    },
  },
  actions: {
    async login(
      context: ActionContext<AuthState, State>,
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
      } catch (err) {
        context.commit("setError", err);
        context.commit("setLoading", false);
      }
    },
    logout(context: ActionContext<AuthState, State>) {
      tokenService.removeTokens();
      context.commit("setIsAuthenticated", false);
      context.commit("setUser", null);
      context.commit("setError", null);
    },
    async loadFromStore(context: ActionContext<AuthState, State>) {
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
      } catch (err) {
        tokenService.removeTokens();
        context.commit("setError", err);
        context.commit("setLoading", false);
      }
      context.commit("setHasStartupLoaded", true);
    },
  },
};
