import { AxiosError } from "axios";
import { User } from "../types/user";
import makeRequest from "./api";

interface AuthResponse {
  userId: number
}

export const sendAuthData = async (
  initDataRaw: string,
  referralCode: string | null = null
): Promise<AuthResponse> => {
  try {
    const url = referralCode
      ? `/auth/login?startapp=${encodeURIComponent(referralCode)}`
      : "/auth/login";

    const response = await makeRequest.post<AuthResponse>(url, { data: initDataRaw });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Ошибка авторизации:", error.message);
    }

    if (error instanceof AxiosError && error.response?.status === 400) {
      console.warn("Повторная попытка входа с реферальным кодом. Перенаправляем на обычный логин...");
      return sendAuthData(initDataRaw, null); // Пробуем без реферального кода
    }

    alert(`${error}`);
    throw error;
  }
};

export const fetchUserData = async (userId: number) => {
  try {
    const response = await makeRequest.get<User>(`/users/${userId}`)
    return response.data
  } catch (error) {
    alert("Ошибка в получении");
    throw error;
  }
}