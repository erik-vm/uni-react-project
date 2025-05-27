
import { useContext } from "react";
import type { ILoginDto } from "../../types/ILoginDto";
import { AccountContext } from "../stores/accountStore";
import axios, { type AxiosInstance } from "axios";

export abstract class BaseService {
	protected axiosInstance: AxiosInstance;

	// eslint-disable-next-line react-hooks/rules-of-hooks
	private setAccountInfo = useContext(AccountContext).setAccountInfo;


	constructor() {
		this.axiosInstance
			= axios.create({
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

