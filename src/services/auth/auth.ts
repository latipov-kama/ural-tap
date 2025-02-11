import axios from "axios";

export const sendAuthData = async () => {
  if (typeof window === "undefined" || !window.Telegram?.WebApp) {
    alert("Telegram WebApp API is not available");
    return;
  }

  const initData = window.Telegram.WebApp.initData;
  if (!initData) {
    alert("No initData found");
    return;
  }

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/auth/login`,
      new URLSearchParams({ data: initData }).toString(), // Преобразуем в строку запроса
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    alert(JSON.stringify(response.data));
  } catch (error) {
    console.error("Error sending data:", error);
  }
};
