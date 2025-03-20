import { create } from "zustand";
import { fetchUserData, sendAuthData } from "../services/authApi";
import { User } from "../types/user";
import { retrieveLaunchParams } from "@telegram-apps/sdk";

interface AuthState {
  user: User | null;
  userId: number | null;
  isAuthenticated: boolean;
  photoUrl: string | null
  initAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userId: null,
  user: null,
  photoUrl: null,
  initAuth: async () => {
    try {
      let referralCode: string | null = null;
      // const initDataRaw = "user=%7B%22id%22%3A909990269%2C%22first_name%22%3A%22Kamran%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22latipov_kama%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FJgo_S36x4Mww1tqsAYlTU4q-Eh4U4NjScTy0jANiS8Q.svg%22%7D&chat_instance=-6139524046167966589&chat_type=private&auth_date=1742497462&signature=OOwPM3c05veWfi-VUUQb9XvNgbVj21niPwGIzzhwGNmxPWNNl7YfVCSX9DJAJZSH8YY8Zyo8Xjy69Urdu6g8Ag&hash=e00ce1b69619c609973aa1dec2b7354619efcc9bc4789c73b806792d4af3eff1"

      // 1️⃣ Получаем параметры Telegram SDK
      const { initDataRaw, initData, startParam } = retrieveLaunchParams();

      // 2️⃣ Проверяем startParam
      if (startParam) {
        referralCode = startParam;
      } else {
        const initParams = new URLSearchParams(Telegram.WebApp.initData);
        referralCode = initParams.get("start") || null;
      }

      console.log(referralCode);

      // 4️⃣ Проверяем initDataRaw
      if (!initDataRaw) {
        alert("initDataRaw не найдено, авторизация невозможна");
        return;
      }

      // 5️⃣ Отправляем данные на сервер
      const response = await sendAuthData(initDataRaw, referralCode);
      // const response = await sendAuthData(initDataRaw);
      console.log("Ответ сервера:", response);

      if (response?.userId) {
        set({ userId: response.userId, photoUrl: initData?.user?.photoUrl });

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
