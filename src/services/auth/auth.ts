import { TelegramInitData } from "../../types";
import apiClient from "../api";

export const authUser = async (tgData: TelegramInitData) => {
  try {
    const params = new URLSearchParams();

    // Добавляем user как строку JSON в URL-кодировке
    params.append("user", JSON.stringify(tgData.user));
    params.append("auth_date", String(tgData.auth_date));
    params.append("signature", tgData.signature ?? ""); // Если signature нет, отправляем пустую строку
    params.append("hash", tgData.hash);

    const response = await apiClient.post("/auth/login", { data: tgData })

    alert(response)
    return response;
  } catch (error) {
    console.error("Auth error:", error);
    throw error;
  }
};
