import { ILevel } from "../types/level";
import makeRequest from "./api"

export const fetchLevel = async (userId: number) => {
  try {
    const res = await makeRequest.get<ILevel>(`/level/${userId}`)

    return res
  } catch (error) {
    console.error(error);
    throw error
  }
}