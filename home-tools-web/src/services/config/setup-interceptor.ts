import { AxiosError, AxiosRequestConfig } from "axios";
import { Store } from "vuex";

import authService from "@/services/auth-service";
import axiosInstance from "@/services/common/axios-instance";
import tokenService from "@/services/token-service";
import { State } from "@/store";

export function setupHttpInterceptor(store: Store<State>) {
  axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      if (!config || !config.headers) {
        return config;
      }

      const token = tokenService.getAccessToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axiosInstance.interceptors.response.use(
    (resp) => {
      return resp;
    },
    async (err: AxiosError) => {
      try {
        if (
          err.config?.url !== "/auth/login" &&
          err.config?.url !== "/auth/refresh" &&
          err.response?.status === 401
        ) {
          const refreshToken = tokenService.getRefreshToken();
          if (!refreshToken) {
            return Promise.reject(err);
          }
          const refreshResponse = await authService.refresh(refreshToken);
          tokenService.setTokens(
            refreshResponse.data.accessToken,
            refreshResponse.data.refreshToken
          );
          store.dispatch("auth/setIsAuthenticated", false);
          if (!err.config) {
            return Promise.reject(err);
          }
          return axiosInstance(err.config);
        }
      } catch (error) {
        return Promise.reject(error);
      }
      return Promise.reject(err);
    }
  );
}
