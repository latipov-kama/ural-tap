import { User } from "../types/user";
import makeRequest from "./api";

export const sendAuthData = async (initDataRaw: string) => {
  try {
    // const url = referralCode ? `/auth/login?start=${encodeURIComponent(referralCode)}` : "/auth/login";
    const url = "/auth/login?start=1398fd22-441d-4636-ae3e-4f8f8e8e1f50";
    console.log(url);

    const response = await makeRequest.post(url, { data: initDataRaw });
    return response.data;
  } catch (error) {
    alert("Ошибка авторизации:");
    throw error;
  }
};

export const fetchUserData = async (userId: number) => {
  try {
    const response = await makeRequest.get<User>(`/users/${userId}`)
    return response.data
  } catch (error) {
    alert("Ошибка авторизации:");
    throw error;
  }
}