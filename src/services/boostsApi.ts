import makeRequest from "./api"

export const getBoosts = async () => {
  try {
    const res = await makeRequest.get("/boost-items")
    return res.data
  } catch (error) {
    console.error("Ошибка получения бустов:", error)
    throw error
  }
}

export const getBoostById = async (id: number) => {
  try {
    const res = await makeRequest.get(`/boost-items/${id}`)
    return res.data
  } catch (error) {
    console.error("Ошибка получения бустов:", error)
    throw error
  }
}

export const applyBoostEffect = async (boostId: number, userId: number) => {
  try {
    await makeRequest.post(`/boost-effects/${boostId}/purchase?userId=${userId}`)
  } catch (error) {
    console.error("Ошибка применения буста:", error)
    throw error
  }
}