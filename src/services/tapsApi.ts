import { ITaps } from "../types/taps";
import makeRequest from "./api"

export const fetchTaps = async (userId: number) => {
  if (!userId) return

  try {
    const res = await makeRequest.get<ITaps>(`/taps?userId=${userId}`)

    return res.data
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const updateEnergy = async (userId: number, amount: number) => {
  try {
    const res = await makeRequest.post(`/taps/use?userId=${userId}`, { amount })

    return res
  } catch (error) {
    console.error(error);
    throw error
  }
}