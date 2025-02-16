import makeRequest from "./api";

export const sendAuthData = async (initDataRaw: string) => {
  try {
    const response = await makeRequest.post("/auth/login", { data: initDataRaw });
    return response.data;
  } catch (error) {
    console.log("Ошибка авторизации:", error);
    throw error;
  }
};

export const fetchUserData = async (userId: number) => {
  try {
    const response = await makeRequest.get(`/users/${userId}`)
    return response.data
  } catch (error) {
    console.log("Ошибка авторизации:", error);
    throw error;
  }
}