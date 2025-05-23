import axios from "axios";
import type { ILoginDto } from "../types/ILoginDto";

const apiUrl = import.meta.env.VITE_API_URL || 'https://sportmap.akaver.com/api/v1/';

const agent = axios.create({
  baseURL: apiUrl,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

agent.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('Making request to:', config.baseURL + config.url);
    console.log('Auth header:', config.headers.Authorization ? 'Present' : 'Missing');
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
    
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const jwt = localStorage.getItem("jwt");
        const refreshToken = localStorage.getItem("refreshToken"); // Fixed: consistent key
        
        if (!jwt || !refreshToken) {
          // No tokens available, redirect to login
          console.log("No tokens available for refresh");
          localStorage.clear();
          window.location.href = 'account/login';
          return Promise.reject(error);
        }

        console.log("Attempting token refresh...");
        
    


    

        return Promise.reject(error);
        
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        
        // Clear tokens and redirect to login
        localStorage.clear();
        window.location.href = 'account/login';
        
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default agent;