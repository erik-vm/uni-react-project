import { createContext } from "react";
import UserStore from "./userStore";
// import AccountStore from "./accountStore";
import { UiStore } from "./uiStore";

interface Store {
  userStore: UserStore;
  // accountStore: AccountStore;
  uiStore: UiStore;
}

export const store: Store = {
  userStore: new UserStore(),
  // accountStore: new AccountStore(),
  uiStore: new UiStore(),
};

export const StoreContext = createContext(store);
