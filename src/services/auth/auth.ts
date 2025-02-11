import axios from "axios";

const test = {
  user: {
    added_to_attachment_menu: false,
    allows_write_to_pm: false,
    first_name: "user-first-name",
    id: 422,
    is_bot: true,
    is_premium: false,
    language_code: "en",
    last_name: "user-last-name",
    photo_url: "user-photo",
    username: "user-username",
  },
  auth_date: "1739220101",
  signature: "",
  hash: "ae79eca87f4580895f1b508f0944e5cff01d6b89c9d2a18a0a790439c7075323",
};

export const sendAuthData = async () => {
  if (typeof window === "undefined" || !window.Telegram?.WebApp) {
    alert("Telegram WebApp API is not available");
    return;
  }

  try {
    // Кодируем объект в `application/x-www-form-urlencoded`
    const encodedData = new URLSearchParams({
      user: JSON.stringify(test.user),
      auth_date: test.auth_date,
      signature: test.signature,
      hash: test.hash,
    }).toString();

    // Создаем JSON с `data`
    const requestData = { data: encodedData };

    console.log("Request JSON:", JSON.stringify(requestData));

    // Отправляем JSON
    const response = await axios.post(
      `${import.meta.env.VITE_SERVER_URL}/auth/login`,
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    alert(JSON.stringify(response.data));
  } catch (error) {
    console.error("Error sending data:", error);
  }
};
