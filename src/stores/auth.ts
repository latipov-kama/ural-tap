import { create } from "zustand";
import { fetchUserData, sendAuthData } from "../services/auth";
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
      const { initDataRaw, startParam } = retrieveLaunchParams();
      console.log("Запуск Mini App:", { initDataRaw, startParam });

      if (startParam) {
        referralCode = startParam;
      } else {
        const initParams = new URLSearchParams(Telegram.WebApp.initData);
        referralCode = initParams.get("start") || null;
      }

      console.log("Реферальный код:", referralCode);

      // Проверка наличия initDataRaw
      if (!initDataRaw) {
        alert("initDataRaw не найдено, авторизация невозможна");
        return;
      }

      // 1️⃣ Получаем userId из initDataRaw
      const initParams = new URLSearchParams(initDataRaw);
      const userId = initParams.get("user") ? JSON.parse(decodeURIComponent(initParams.get("user")!)).id : null;
      if (!userId) {
        console.error("Не удалось получить userId");
        return;
      }

      console.log("🔹 Найден userId:", userId);

      // 2️⃣ Проверяем, существует ли пользователь
      const existingUser = await fetchUserData(userId);
      if (existingUser) {
        console.log("✅ Пользователь найден, загружаем данные...");
        set({ user: existingUser, userId, isAuthenticated: true });
        return;
      }

      console.log("⚡ Пользователь не найден, отправляем данные для регистрации...");

      // 3️⃣ Если пользователя нет, создаём его
      const response = await sendAuthData(initDataRaw, referralCode);
      console.log("Ответ сервера:", response);

      if (response?.userId) {
        set({ userId: response.userId });

        // 4️⃣ Загружаем созданного пользователя
        const newUser = await fetchUserData(response.userId);
        if (newUser) {
          set({ user: newUser, isAuthenticated: true });
        }
      }
    } catch (error) {
      console.error("Ошибка авторизации:", error);
    }
  },
}));

// const initDataRaw = "user=%7B%22id%22%3A909990269%2C%22first_name%22%3A%22Kamran%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22latipov_kama%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FJgo_S36x4Mww1tqsAYlTU4q-Eh4U4NjScTy0jANiS8Q.svg%22%7D&chat_instance=-1537647949971518884&chat_type=private&auth_date=1739711102&signature=i1YM7FDBa-EOqQpzzcQY520cNDqNWWYr7jnRjNh6Kpt-NHCXnAEKlCStC-l6k8SrWucfWCEoLGc24gtlkgYGCA&hash=e538c03c7ff743b9cd858b341f45b4efbfd3c602a170c2808f98a7710dc47969"