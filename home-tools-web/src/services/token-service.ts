export class TokenService {
  private static readonly ACCESS_TOKEN_KEY = "ACCESS_TOKEN";
  private static readonly REFRESH_TOKEN_KEY = "REFRESH_TOKEN";

  public getAccessToken(): string | null {
    return localStorage.getItem(TokenService.ACCESS_TOKEN_KEY);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(TokenService.REFRESH_TOKEN_KEY);
  }

  public setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(TokenService.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(TokenService.REFRESH_TOKEN_KEY, refreshToken);
  }

  public removeTokens() {
    localStorage.removeItem(TokenService.ACCESS_TOKEN_KEY);
    localStorage.removeItem(TokenService.REFRESH_TOKEN_KEY);
  }
}

export default new TokenService();
