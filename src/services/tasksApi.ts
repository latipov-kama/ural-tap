import { Task } from "../types/tasks"
import makeRequest from "./api"

export const getTasks = async (): Promise<Task[]> => {
  try {
    const res = await makeRequest.get("/tasks")
    return res.data.data
  } catch (error) {
    console.error("Ошибка получения задач:", error)
    throw error
  }
}

export const getUserTasks = async (userId: number) => {
  try {
    const res = await makeRequest.get(`/user-tasks?userId=${userId}`)

    return res.data
  } catch (error) {
    console.error(error);
    throw error
  }
}
