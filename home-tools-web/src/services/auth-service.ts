import axios, { AxiosResponse } from "axios";

import { AuthTokensResponse } from "@/models/auth-tokens-response";
import { LoginCredential } from "@/models/login-credential";

export class AuthService {
  static readonly AUTH_ENDPOINT = `${process.env.VUE_APP_HOME_TOOLS_SERVICE}/auth`;
  static readonly HEADERS = {
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
  };

  public login(
    loginCredential: LoginCredential
  ): Promise<AxiosResponse<AuthTokensResponse>> {
    return axios.post<AuthTokensResponse>(
      `${AuthService.AUTH_ENDPOINT}/login`,
      loginCredential,
      AuthService.HEADERS
    );
  }

  public refresh(
    refreshToken: string
  ): Promise<AxiosResponse<AuthTokensResponse>> {
    return axios.get<AuthTokensResponse>(
      `${AuthService.AUTH_ENDPOINT}/refresh`,
      {
        headers: {
          ...AuthService.HEADERS.headers,
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
  }
}

export default new AuthService();
