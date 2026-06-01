import axios from "axios";

const URL = import.meta.env.VITE_API_URL || "https://localhost:7161/api";

const apiClient = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export default apiClient;