import { makeAutoObservable } from "mobx";

export default class AccountStore {
  jwt?: string = undefined;
  refreshToken?: string = undefined;
  static jwt: string;
  static refreshToken: string;

  constructor() {
    makeAutoObservable(this);

    this.loadTokensFromStorage();
  }

  setTokens(jwt: string, refreshToken: string) {
    this.jwt = jwt;
    this.refreshToken = refreshToken;

    localStorage.setItem("_jwt", jwt);
    localStorage.setItem("_refreshToken", refreshToken);
  }

  logout() {
    this.jwt = undefined;
    this.refreshToken = undefined;

    localStorage.removeItem("_jwt");
    localStorage.removeItem("_refreshToken");
  }

  get isLoggedIn() {
    return !!this.jwt;
  }

  private loadTokensFromStorage() {
    const jwt = localStorage.getItem("_jwt");
    const refreshToken = localStorage.getItem("_refreshToken");

    if (jwt && refreshToken) {
      this.jwt = jwt;
      this.refreshToken = refreshToken;
    }
  }
}
