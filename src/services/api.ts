import axios from "axios";

const api = axios.create({
  baseURL: "",
  headers: {
    'Content-Type': 'application/json',
  }
})

api.interceptors.request.use(
  (config) => {
    const initData = window.Telegram?.WebApp?.initData || ""
    if (initData) {
      config.headers["X-Telegram-InitData"] = initData
    }

    return config
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error("Response error", error);

    if (error.response?.status === 401) {
      alert('Unauthorized! Please re-login.');
    }

    return Promise.reject(error)
  }
)

export default api