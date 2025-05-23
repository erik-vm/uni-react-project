import axios from "axios";

// This should now work correctly
const apiUrl = import.meta.env.VITE_API_URL;

console.log('Mode:', import.meta.env.MODE);
console.log('API URL from env:', apiUrl);

const agent = axios.create({
  baseURL: apiUrl,
});

// Add request interceptor for debugging
agent.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.baseURL + config.url);
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
    console.log('Failed URL:', error.config?.baseURL + error.config?.url);
    return Promise.reject(error);
  }
);

export default agent;