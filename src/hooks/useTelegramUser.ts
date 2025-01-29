import { useEffect, useState } from "react";

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

export const useTelegramAuth = () => {
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg || !tg.initDataUnsafe?.user) {
      console.error("Не удалось получить данные пользователя");
      return;
    }

    const telegramUser: TelegramUser = {
      ...tg.initDataUnsafe.user,
      auth_date: 22,
      hash: "tg.initDataUnsafe.hash",
    };

    setUser(telegramUser);

    // fetch("/api/auth", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(telegramUser),
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log("Auth success:", data))
    //   .catch((err) => console.error("Auth error:", err));
  }, []);

  return user;
};
