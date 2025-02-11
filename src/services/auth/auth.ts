import { TelegramInitData } from "../../types"
import apiClient from "../api"


export const authUser = async (initData: TelegramInitData) => {
  try {
    const response = await apiClient.post("/auth/login", { data: initData })
    console.log(response);

    return response
  } catch (error) {
    console.error("Ошибка аутентификации:", error);
    throw error;
  }
}