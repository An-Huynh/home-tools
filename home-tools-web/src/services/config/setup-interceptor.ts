import axiosInstance from "@/services/common/axios-instance";
import tokenService from "@/services/token-service";
import { Store } from "vuex";
import { AxiosRequestConfig, AxiosError } from "axios";
import authService from "@/services/auth-service";

export function setupHttpInterceptor(store: Store<any>) {
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
          const refreshResponse = await authService.refresh(
            tokenService.getRefreshToken()!
          );
          tokenService.setTokens(
            refreshResponse.data.accessToken,
            refreshResponse.data.refreshToken
          );
          store.dispatch("auth/setIsAuthenticated", false);
          return axiosInstance(err.config!);
        }
      } catch (error) {
        return Promise.reject(err);
      }
      return Promise.reject(err);
    }
  );
}
