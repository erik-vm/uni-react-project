import { makeAutoObservable } from "mobx";

export default class UserStore {
  token?: string = undefined;
  status?: string = undefined;
  firstName?: string = undefined;
  lastName?: string = undefined;

  constructor() {
    makeAutoObservable(this);

    // Load user info from localStorage on initialization
    this.loadUserFromStorage();
  }

  setUser(token: string, status: string, firstName: string, lastName: string) {
    this.token = token;
    this.status = status;
    this.firstName = firstName;
    this.lastName = lastName;

    localStorage.setItem("_token", this.token);
    localStorage.setItem("_status", this.status);
    localStorage.setItem("_firstName", this.firstName);
    localStorage.setItem("_lastName", this.lastName);
  }

  clearUser() {
    this.token = undefined;
    this.status = undefined;
    this.firstName = undefined;
    this.lastName = undefined;

    // Remove user info from localStorage
    localStorage.removeItem("_token");
    localStorage.removeItem("_status");
    localStorage.removeItem("_firstName");
    localStorage.removeItem("_lastName");
  }

  get fullName() {
    return this.firstName && this.lastName
      ? `${this.firstName} ${this.lastName}`
      : "";
  }

  get isActive() {
    return this.status === "active";
  }

  private loadUserFromStorage() {
    const token = localStorage.getItem("_toke");
    const status = localStorage.getItem("_status");
    const firstName = localStorage.getItem("_firstName");
    const lastName = localStorage.getItem("_lastName");

    if (token && status && firstName && lastName) {
      this.token = token;
      this.status = status;
      this.firstName = firstName;
      this.lastName = lastName;
    }
  }
}
