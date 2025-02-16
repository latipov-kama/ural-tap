import { create } from "zustand";
import { fetchUserData, sendAuthData } from "../services/auth";
import { User } from "../types/user";
import { retrieveLaunchParams } from "@telegram-apps/sdk";

interface AuthState {
  user: User | null;
  userId: number | null;
  isAuthenticated: boolean;
  referralCode: string | null;
  initAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userId: null,
  user: null,
  referralCode:
    typeof window !== "undefined" ? localStorage.getItem("referral_code") : null,

  initAuth: async () => {
    try {
      let referralCode: string | null = null;

      // Получаем параметры запуска из Telegram
      const { startParam, initDataRaw } = retrieveLaunchParams();
      alert(startParam);

      if (startParam) {
        referralCode = startParam;
      } else {
        // Альтернативно, проверяем URL (для совместимости)
        const searchParams = new URLSearchParams(window.location.search);
        referralCode = searchParams.get("start");
      }

      console.log("Реферальный код:", referralCode);

      if (referralCode) {
        localStorage.setItem("referral_code", referralCode);
        set({ referralCode });
      }

      // Получаем initDataRaw из Telegram SDK
      if (!initDataRaw) {
        console.warn("initDataRaw не найдено, авторизация невозможна");
        return;
      }

      // Отправляем данные на сервер
      const response = await sendAuthData(initDataRaw, referralCode);

      if (response?.userId) {
        set({ userId: response.userId });

        // Загружаем данные пользователя
        const userData = await fetchUserData(response.userId);
        if (userData) {
          set({ user: userData, isAuthenticated: true });

          // Очищаем referral_code после успешной авторизации
          localStorage.removeItem("referral_code");
          set({ referralCode: null });
        }
      }
    } catch (error) {
      console.error("Ошибка авторизации:", error);
    }
  },
}));