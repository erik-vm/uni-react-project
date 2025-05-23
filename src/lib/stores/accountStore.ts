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

    localStorage.setItem("jwt", jwt);
    localStorage.setItem("refreshToken", refreshToken);
  }

  logout() {
    this.jwt = undefined;
    this.refreshToken = undefined;

    localStorage.removeItem("jwt");
    localStorage.removeItem("refreshToken");
  }

  get isLoggedIn() {
    return !!this.jwt;
  }

  private loadTokensFromStorage() {
    const jwt = localStorage.getItem("jwt");
    const refreshToken = localStorage.getItem("refreshToken");

    if (jwt && refreshToken) {
      this.jwt = jwt;
      this.refreshToken = refreshToken;
    }
  }
}
