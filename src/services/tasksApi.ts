import makeRequest from "./api"

export const getTasks = async () => {
  try {
    const res = await makeRequest.get("/tasks")
    return res.data.data
  } catch (error) {
    console.error("Ошибка получения задач:", error)
    throw error
  }
}

export const getTaskById = async (id: number) => {
  try {
    const res = await makeRequest.get(`/tasks/${id}`)

    return res.data
  } catch (error) {
    console.error("Ошибка получения задачи:", error)
    throw error
  }
}

export const getUserTasks = async (userId: number) => {
  try {
    const res = await makeRequest.get(`/user-tasks?userId=${userId}`)

    return res.data
  } catch (error) {
    console.error("Ошибка получения задач:", error)
    throw error
  }
}

export const startTask = async (taskId: number, userId: number) => {
  try {
    await makeRequest.post(`/user-tasks/${taskId}/start?userId=${userId}`)
  } catch (error) {
    console.error("Ошибка выполнения задачи:", error);
    throw error;
  }
}