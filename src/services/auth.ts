import { User } from "../types/user";
import makeRequest from "./api";

export const sendAuthData = async (initDataRaw: string, referralCode: string | null) => {
  alert(referralCode)
  alert(JSON.stringify(initDataRaw))

  try {
    const url = referralCode ? `/auth/login?start=${encodeURIComponent(referralCode)}` : "/auth/login";
    alert(url)

    const response = await makeRequest.post(url, { data: initDataRaw });
    return response.data;
  } catch (error) {
    alert("Ошибка авторизации");
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