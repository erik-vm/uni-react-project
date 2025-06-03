import { createContext } from "react";

// import AccountStore from "./accountStore";
import { UiStore } from "./uiStore";
import UserStore from "./userStore";

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
