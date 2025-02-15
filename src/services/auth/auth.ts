import axios from "axios";

const test = {
  "user": {
    "id": 909990269,
    "first_name": "Kamran",
    "last_name": "",
    "username": "latipov_kama",
    "language_code": "ru",
    "allows_write_to_pm": true,
    "photo_url": "https://t.me/i/userpic/320/Jgo_S36x4Mww1tqsAYlTU4q-Eh4U4NjScTy0jANiS8Q.svg"
  },
  "chat_instance": "8180690052102929318",
  "chat_type": "sender",
  "auth_date": "1738578480",
  "signature": "yexIMgh2Z7zG_jaSxBhCpUbGEy8SgihWAvTaWn6ay6X-7O0C6Iut5FhGXRoRTFd885JQILrkm8g62-4VwKbUBw",
  "hash": "35dcd936e488bb2a16ab71e2d4d3d0426747a4d67cf2096377f0310a045dcf92"
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
