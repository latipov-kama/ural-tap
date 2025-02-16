import makeRequest from "./api";

export const sendAuthData = async (initDataRaw: string) => {
  try {
    const response = await makeRequest.post("/auth/login", { data: initDataRaw });
    return response.data;
  } catch (error) {
    alert(`Ошибка авторизации ${error}`);
    throw error;
  }
};