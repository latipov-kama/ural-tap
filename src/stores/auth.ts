import { create } from "zustand";
import { retrieveLaunchParams } from "@telegram-apps/sdk";
import { fetchUserData, sendAuthData } from "../services/auth";
import { User } from "../types";

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
      const { initDataRaw } = retrieveLaunchParams();
      if (!initDataRaw) return;

      const response = await sendAuthData(initDataRaw);

      if (response?.userId) {
        set({ userId: response.userId });

        const userData = await fetchUserData(response.userId)
        if (userData) {
          set({ user: userData, isAuthenticated: true })
        }
      }

      alert(response.userId)
    } catch (error) {
      console.error("Ошибка авторизации", error);
    }
  },
}));
