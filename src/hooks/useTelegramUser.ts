import axios from "axios";
import { useEffect, useState } from "react";

interface TelegramInitData {
  user?: TelegramUser;
  auth_date: number;
  hash: string;
}

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number
  hash: string
}

export const useTelegramAuth = () => {
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    // Проверяем, доступен ли объект Telegram
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tgData = window.Telegram.WebApp.initDataUnsafe as TelegramInitData; // Явно указываем тип

      if (tgData?.user) {
        const userData = {
          ...tgData.user,
          auth_date: tgData.auth_date,
          hash: tgData.hash,
        };

        setUser(userData);

        // Отправляем данные на сервер
        axios
          .post("/api/auth", userData)
          .then((res) => console.log("Auth success:", res.data))
          .catch((err) => console.error("Auth error:", err));
      }
    } else {
      console.warn("Запущено не в Telegram! WebApp недоступен.");
    }
  }, []);

  return user;
};
