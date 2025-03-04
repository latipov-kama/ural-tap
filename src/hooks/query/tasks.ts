import { useQuery } from "@tanstack/react-query"
import { getTasks } from "../../services/tasksApi"
import { Task } from "../../types/tasks"

// Получение задач
export const useTasks = () => {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: getTasks,
  })
}

