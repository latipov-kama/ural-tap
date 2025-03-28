import makeRequest from "./api"

export const getRaffles = async () => {
  try {
    const res = await makeRequest.get("/raffles")
    return res.data
  } catch (error) {
    console.error("Ошибка получения розыгрышей:", error)
    throw error
  }
}

export const joinToRaffle = async (raffleId: number, userId: number) => {
  try {
    const res = await makeRequest.post(`/raffles/${raffleId}/join`, { userId: userId })
    console.log(res);

    return res
  } catch (error) {
    console.error("Ошибка:", error);
    throw error;
  }
}
