import { ILevel } from "../types/level";
import makeRequest from "./api"

export const fetchLevel = async (userId: number) => {
  try {
    const res = await makeRequest.get<ILevel>(`/level/${userId}`)

    return res.data
  } catch (error) {
    console.error(error);
    throw error
  }
}

export const updateLevelXP = async (userId: number, xp: number) => {
  try {
    const res = await makeRequest.post(`/level/xp/add`, { userId, xp })

    return res
  } catch (error) {
    console.error(error);
    throw error
  }
}