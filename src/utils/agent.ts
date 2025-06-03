import axios from "axios";

const apiUrl =
  import.meta.env.VITE_API_URL || "https://sportmap.akaver.com/api";

const agent = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

agent.interceptors.request.use(
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

agent.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const jwt = localStorage.getItem("_jwt");
        const refreshToken = localStorage.getItem("_refreshToken");

        if (!jwt || !refreshToken) {
          return Promise.reject(error);
        }

        const response = await axios.post(
          `https://sportmap.akaver.com/api/v2account/renewRefreshToken?jwtExpiresInSeconds=5`,
          {
            jwt: jwt,
            refreshToken: refreshToken,
          }
        );

        if (response && response.status <= 300) {
          localStorage.setItem("_jwt", response.data.jwt);
          localStorage.setItem("_refreshToken", response.data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${response.data.jwt}`;

          return agent(originalRequest);
        }

        return Promise.reject(error);
      } catch (refreshError) {

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default agent;
