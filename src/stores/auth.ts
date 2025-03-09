import { create } from "zustand";
import { fetchUserData, sendAuthData } from "../services/authApi";
import { User } from "../types/user";
import { retrieveLaunchParams } from "@telegram-apps/sdk";

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
      let referralCode: string | null = null;
      // const initDataRaw = "user=%7B%22id%22%3A909990269%2C%22first_name%22%3A%22Kamran%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22latipov_kama%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FJgo_S36x4Mww1tqsAYlTU4q-Eh4U4NjScTy0jANiS8Q.svg%22%7D&chat_instance=-6217533691187218638&chat_type=group&auth_date=1741164749&signature=7bt2Leo8sUeJUzUhxDqg00jTlCfjt6rp4yP0H8fm9KlJQzAIpyZuzN2mIwYG9R9-cLkoneUXZnbKaWp53UfTDw&hash=9c27f0bb20aad740c496e542f69641d33ec768087504523d20c78dd785145c05"

      // 1️⃣ Получаем параметры Telegram SDK
      const { initDataRaw, startParam } = retrieveLaunchParams();

      // 2️⃣ Проверяем startParam
      if (startParam) {
        referralCode = startParam;
      } else {
        const initParams = new URLSearchParams(Telegram.WebApp.initData);
        referralCode = initParams.get("start") || null;
      }

      // 4️⃣ Проверяем initDataRaw
      if (!initDataRaw) {
        alert("initDataRaw не найдено, авторизация невозможна");
        return;
      }

      // 5️⃣ Отправляем данные на сервер
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
// const initDataRaw = "user=%7B%22id%22%3A909990269%2C%22first_name%22%3A%22Kamran%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22latipov_kama%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FJgo_S36x4Mww1tqsAYlTU4q-Eh4U4NjScTy0jANiS8Q.svg%22%7D&chat_instance=-1537647949971518884&chat_type=private&auth_date=1739711102&signature=i1YM7FDBa-EOqQpzzcQY520cNDqNWWYr7jnRjNh6Kpt-NHCXnAEKlCStC-l6k8SrWucfWCEoLGc24gtlkgYGCA&hash=e538c03c7ff743b9cd858b341f45b4efbfd3c602a170c2808f98a7710dc47969"