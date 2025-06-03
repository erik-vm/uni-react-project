
import axios, { type AxiosInstance } from "axios";
import type { ILoginDto } from "../../types/ILoginDto";
import { type IAccountInfo } from "../stores/accountStore";
import type { IUserDto } from "../../types/IUserDto";

export abstract class BaseService {
	protected axiosInstance: AxiosInstance;
	private setAccountInfo?: (value: IAccountInfo) => void;
	private setUserInfo?: (value: IUserDto) => void;

	constructor(
		setAccountInfo?: (value: IAccountInfo) => void, setUserInfo?: (value: IUserDto) => void) {
		this.setAccountInfo = setAccountInfo;
		this.setUserInfo = setUserInfo;
		
		this.axiosInstance = axios.create({
			baseURL: "https://sportmap.akaver.com/api/",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
		});

		this.axiosInstance.interceptors.request.use(
			(config) => {
				const token = localStorage.getItem("_jwt");
				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}
				return config;
			},
			(error) => {
				return Promise.reject(error);
			}
		);

		this.axiosInstance.interceptors.response.use(
			(response) => {
				return response;
			},

			async (error) => {
				const originalRequest = error.config;
				if (error.response && error.response.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true;
					try {
						const jwt = localStorage.getItem("_jwt");
						const refreshToken = localStorage.getItem("_refreshToken");
						const response = await axios.post<ILoginDto>(
							"https://sportmap.akaver.com/api/v2/account/renewRefreshToken?jwtExpiresInSeconds=5",
							{
								jwt: jwt,
								refreshToken: refreshToken,
							}
						);

						console.log("renewRefreshToken", response);

						if (response && response.status <= 300) {
							localStorage.setItem("_jwt", response.data.jwt);
							localStorage.setItem("_refreshToken", response.data.refreshToken);
							originalRequest.headers.Authorization = `Bearer ${response.data.jwt}`;

							this.setAccountInfo!({
								jwt: response.data.jwt,
								refreshToken: response.data.refreshToken,
							});

						const userData =	await this.axiosInstance.post<IUserDto>(
          "https://sportmap.akaver.com/api/v1/account/login"

		
        )
		  if(userData && userData.status <= 300){
			setUserInfo!({
				token: userData.data.token,
				status: userData.data.status,
				firstName: userData.data.firstName,
				lastName: userData.data.lastName,
			})
		  }

							return this.axiosInstance(originalRequest);
						}

						return Promise.reject(error);
					} catch (error) {
						console.error("Error refreshing token:", error);
						return Promise.reject(error);
					}

				}
				return Promise.reject(error);
			}
		);
	}
}

