import { create } from "zustand";
import { fetchUserData, sendAuthData } from "../services/authApi";
import { User } from "../types/user";
import toast from "react-hot-toast";
// import { retrieveLaunchParams } from "@telegram-apps/sdk";

interface AuthState {
  user: User | null;
  userId: number | null;
  isAuthenticated: boolean;
  photoUrl: string | null
  initAuth: () => Promise<void>;
  fetchUser: (userId: number) => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userId: null,
  user: null,
  photoUrl: null,
  initAuth: async () => {
    try {
      // let referralCode: string | null = null;
      const initDataRaw = "user=%7B%22added_to_attachment_menu%22%3Afalse%2C%22allows_write_to_pm%22%3Afalse%2C%22first_name%22%3A%22user-first-name%22%2C%22id%22%3A8489985%2C%22is_bot%22%3Atrue%2C%22is_premium%22%3Afalse%2C%22language_code%22%3A%22en%22%2C%22last_name%22%3A%22user-last-name%22%2C%22photo_url%22%3A%22user-photo%22%2C%22username%22%3A%22user-username%22%7D&auth_date=1744368787&signature=&hash=caef35b506b2eb91d576108299305751a03bf4a9c7623c83343ad5383646d1d9"

      // 1️⃣ Получаем параметры Telegram SDK
      // const { initDataRaw, initData, startParam } = retrieveLaunchParams();

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
        toast.error("initDataRaw не найдено, авторизация невозможна")
        return;
      }

      // 5️⃣ Отправляем данные на сервер
      // const response = await sendAuthData(initDataRaw, referralCode);
      const response = await sendAuthData(initDataRaw);
      console.log("Ответ сервера:", response);

      if (response?.userId) {
        // set({ userId: response.userId, photoUrl: initData?.user?.photoUrl });
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
  fetchUser: async (userId: number) => {
    try {
      // const { userId } = get();
      if (!userId) return;

      const userData = await fetchUserData(userId);
      if (userData) {
        set({ user: userData, isAuthenticated: true });
      }
    } catch (error) {
      console.error("Ошибка при обновлении пользователя:", error);
    }
  },
}));
