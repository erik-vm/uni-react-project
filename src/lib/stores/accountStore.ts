import { createContext } from "react";

export interface IAccountInfo {
  jwt?: string;
  refreshToken?: string;
}

export interface IAccountState {
  setAccountInfo?: (value: IAccountInfo) => void;
  loadAccountInfo?: () => IAccountInfo;
  resetAccountInfo?: () => void;
}

export const AccountContext = createContext<IAccountState>({});
