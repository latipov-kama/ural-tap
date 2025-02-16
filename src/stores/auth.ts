import { create } from "zustand";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { sendAuthData } from "../services/auth";
// import { sendAuthData } from "../services/auth";

interface AuthState {
  userId: number | null;
  isAuthenticated: boolean;
  initAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userId: null,
  initAuth: async () => {
    try {
      const { initDataRaw } = retrieveLaunchParams();
      if (!initDataRaw) return;

      alert(initDataRaw)
      const response = await sendAuthData(initDataRaw);
      if (response?.userId) {
        set({ userId: response.userId, isAuthenticated: true });
      }
      alert(JSON.stringify(response))
    } catch (error) {
      console.error("Ошибка авторизации", error);
    }
  },
}));
