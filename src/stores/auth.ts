import { create } from "zustand";
import { fetchUserData, sendAuthData } from "../services/authApi";
import { User } from "../types/user";
// import { retrieveLaunchParams } from "@telegram-apps/sdk";

interface AuthState {
  user: User | null;
  userId: number | null;
  isAuthenticated: boolean;
  initAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userId: null,
  user: null,

  initAuth: async () => {
    try {
      // let referralCode: string | null = null;
      const initDataRaw = "user=%7B%22added_to_attachment_menu%22%3Afalse%2C%22allows_write_to_pm%22%3Afalse%2C%22first_name%22%3A%22user-first-name%22%2C%22id%22%3A8489985%2C%22is_bot%22%3Atrue%2C%22is_premium%22%3Afalse%2C%22language_code%22%3A%22en%22%2C%22last_name%22%3A%22user-last-name%22%2C%22photo_url%22%3A%22user-photo%22%2C%22username%22%3A%22user-username%22%7D&auth_date=1742065992&signature=&hash=03428b3ebef4ed4a37f6befcfb12815442cbc103b9159766e9c42f43eaf609c1"

      // 1️⃣ Получаем параметры Telegram SDK
      // const { initDataRaw, startParam } = retrieveLaunchParams();

      // 2️⃣ Проверяем startParam
      // if (startParam) {
      //   referralCode = startParam;
      // } else {
      //   const initParams = new URLSearchParams(Telegram.WebApp.initData);
      //   referralCode = initParams.get("start") || null;
      // }

      // console.log(referralCode);

      // 4️⃣ Проверяем initDataRaw
      if (!initDataRaw) {
        alert("initDataRaw не найдено, авторизация невозможна");
        return;
      }

      // 5️⃣ Отправляем данные на сервер
      // const response = await sendAuthData(initDataRaw, referralCode);
      const response = await sendAuthData(initDataRaw);
      console.log("Ответ сервера:", response);

      if (response?.userId) {
        set({ userId: response.userId });

        // 6️⃣ Загружаем данные пользователя
        const userData = await fetchUserData(response.userId);
        if (userData) {
          set({ user: userData, isAuthenticated: true });
        }
      }
    } catch (error) {
      console.error("Ошибка авторизации:", error);
    }
  },
}));
