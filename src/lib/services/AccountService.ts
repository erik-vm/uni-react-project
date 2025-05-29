import { AxiosError } from "axios";
import type { ILoginDto } from "../../types/ILoginDto";
import type { IResultObject } from "../../types/IResultObject";
import type { IUserDto } from "../../types/IUserDto";
import { BaseService } from "./BaseService";
import UserStore from "../stores/userStore";
export class AccountService extends BaseService {
  userStore = new UserStore();

  async loginAsync(
    email: string,
    password: string
  ): Promise<IResultObject<ILoginDto>> {
    const url = "v2/account/login";
    try {
      const loginData = {
        email,
        password,
      };

      const [jwtResponse, userDataResponse] = await [
        await this.axiosInstance.post<ILoginDto>(
          url + "?jwtExpiresInSeconds=5",
          loginData
        ),
        await this.axiosInstance.post<IUserDto>(
          "https://sportmap.akaver.com/api/v1/account/login",
          loginData
        ),
      ];

 

      if (jwtResponse.status < 300) {
        localStorage.setItem("_jwt", jwtResponse.data.jwt);
        localStorage.setItem("_refreshToken", jwtResponse.data.refreshToken);
        this.userStore?.setUser(
          userDataResponse.data.token,
          userDataResponse.data.status,
          userDataResponse.data.firstName,
          userDataResponse.data.lastName
        );

console.log("name from store", this.userStore.fullName)

        return {
          statusCode: jwtResponse.status,
          data: jwtResponse.data,
        };
      }

      return {
        statusCode: jwtResponse.status,
        errors: [
          (jwtResponse.status.toString() + " " + jwtResponse.statusText).trim(),
        ],
      };
    } catch (error) {
      console.log("error: ", (error as Error).message);
      return {
        statusCode: (error as AxiosError)?.response?.status ?? 500,
        errors: [(error as AxiosError).code ?? ""],
      };
    }
  }

  async registerAsync(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<IResultObject<ILoginDto>> {
    const url = "v2/account/register";
    try {
      const registerData = {
        email,
        password,
        firstName,
        lastName,
      };

      const response = await this.axiosInstance.post<ILoginDto>(
        url,
        registerData
      );

      console.log("register response", response);

      if (response.status < 300) {
        return {
          statusCode: response.status,
          data: response.data,
        };
      }

      return {
        statusCode: response.status,
        errors: [
          (response.status.toString() + " " + response.statusText).trim(),
        ],
      };
    } catch (error) {
      console.log("error: ", (error as Error).message);
      return {
        statusCode: (error as AxiosError)?.response?.status ?? 500,
        errors: [(error as AxiosError).code ?? ""],
      };
    }
  }

  async logoutAsync(): Promise<IResultObject<void>> {
    const url = "v2/account/logout";
    try {
      const jwt = localStorage.getItem("_jwt");

      const response = await this.axiosInstance.post<void>(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      console.log("logout response", response);

      if (response.status < 300) {
        return {
          statusCode: response.status,
          data: undefined,
        };
      }

      return {
        statusCode: response.status,
        errors: [
          (response.status.toString() + " " + response.statusText).trim(),
        ],
      };
    } catch (error) {
      console.log("error: ", (error as Error).message);
      return {
        statusCode: (error as AxiosError)?.response?.status ?? 500,
        errors: [(error as AxiosError).code ?? ""],
      };
    }
  }
}
