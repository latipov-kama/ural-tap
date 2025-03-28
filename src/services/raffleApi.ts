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

