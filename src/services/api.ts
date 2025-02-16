import axios from "axios";
import { useAuthStore } from "../stores/auth";

const makeRequest = axios.create({
  // baseURL: import.meta.env.VITE_SERVER_URL,
  baseURL: "http://localhost:4000",
  headers: {
    'Content-Type': 'application/json',
  }
})

// Добавляем interceptor для автоматической передачи userId
makeRequest.interceptors.request.use(
  (config) => {
    const userId = useAuthStore.getState().userId;
    if (userId) {
      config.headers["Authorization"] = `Bearer ${userId}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default makeRequest