import { useEffect, useState } from "react";
import { TelegramInitData, TelegramUser } from "../types";
import { useScoreStore } from "../stores/score";

export const MOCK_USER = {
  id: 123456789,
  first_name: "John",
  last_name: "Doe",
  username: "john_doe",
  photo_url: "https://via.placeholder.com/150",
  auth_date: Date.now(),
  hash: "mocked_hash",
  level: 1,
  tapsLimit: 5,
  coins: 100
};

export const useTelegramAuth = () => {
  const [user, setUser] = useState<TelegramUser>(MOCK_USER);

  // Access Zustand store for score and level management
  const { addCoins, coins, level } = useScoreStore();

  useEffect(() => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const tgData = window.Telegram.WebApp.initDataUnsafe as TelegramInitData;

      if (tgData?.user) {
        const userData = {
          ...tgData.user,
          auth_date: tgData.auth_date,
          hash: tgData.hash,
          level: 1,  // Placeholder for now; we'll compute level below
          tapsLimit: 500,
          coins: 100  // Placeholder for now; we will set this from the Telegram data
        };

        setUser(userData);

        addCoins(userData.coins);

        // axios
        //   .post("/api/auth", userData)
        //   .then((res) => console.log("Auth success:", res.data))
        //   .catch((err) => console.error("Auth error:", err));
      }
    }
  }, [addCoins]);

  // Now, return the updated user object, including the computed level and coins
  return {
    ...user,
    coins,    // Updated coins from Zustand
    level     // Updated level from Zustand
  };
};
