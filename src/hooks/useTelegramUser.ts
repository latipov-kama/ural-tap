// import axios from "axios";
import { useEffect, useState } from "react";
import { TelegramInitData, TelegramUser } from "../types";

export const MOCK_USER = {
  id: 123456789,
  first_name: "John",
  last_name: "Doe",
  username: "john_doe",
  photo_url: "https://via.placeholder.com/150",
  auth_date: Date.now(),
  hash: "mocked_hash",
  level: 1,
  tapsLimit: 1,
  coins: 1000
};

export const useTelegramAuth = () => {
  const [user, setUser] = useState<TelegramUser>(MOCK_USER);

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tgData = window.Telegram.WebApp.initDataUnsafe as TelegramInitData;

      if (tgData?.user) {
        const userData = {
          ...tgData.user,
          auth_date: tgData.auth_date,
          hash: tgData.hash,
          level: 1,
          tapsLimit: 100,
          coins: 1000
        };

        setUser(userData);

        // axios
        //   .post("/api/auth", userData)
        //   .then((res) => console.log("Auth success:", res.data))
        //   .catch((err) => console.error("Auth error:", err));
      }
    }
  }, []);

  return user;
};
