import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL || 'https://sportmap.akaver.com/api/v1/';

console.log('API URL:', apiUrl); // Debug log

const agent = axios.create({
  baseURL: apiUrl,
});

// Add request interceptor for debugging
agent.interceptors.request.use(
  (config) => {

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

agent.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    console.log('API Error:', error.response?.status, error.response?.data);
    console.log('Request URL:', error.config?.url);
    console.log('Base URL:', error.config?.baseURL);
    return Promise.reject(error);
  }
);

export default agent;