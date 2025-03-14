import { User } from "../types/user";
import makeRequest from "./api";

export const sendAuthData = async (initDataRaw: string, referralCode: string | null = null) => {
  try {
    console.log(referralCode)
    const url = referralCode ? `/auth/login?startapp=${referralCode}` : "/auth/login";

    alert(url);

    const response = await makeRequest.post(url, { data: initDataRaw });
    console.log(response)
    return response.data;
  } catch (error) {
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