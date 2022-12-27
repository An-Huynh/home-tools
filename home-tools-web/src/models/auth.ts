export interface LoginCredential {
  username: string;
  password: string;
}

export interface AuthTokensResponse {
  accessToken: string;
  refreshToken: string;
}
