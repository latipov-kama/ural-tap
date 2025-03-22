import { useMutation, useQuery } from "@tanstack/react-query"
import { getTaskById, getTasks, getUserTasks, startTask } from "../../services/tasksApi"
import { Task, UserTask } from "../../types/tasks"
import toast from "react-hot-toast"

// Получение задач
export const useTasks = () => {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: getTasks,
  })
}
export const useTask = (id: number) => {
  return useQuery<Task>({
    queryKey: ["tasks"],
    queryFn: () => getTaskById(id),
    enabled: !!id
  })
}

export const useUserTasks = (userId: number) => {
  return useQuery<UserTask[]>({
    queryKey: ["user-tasks", userId],
    queryFn: () => getUserTasks(userId),
    enabled: !!userId
  })
}

export const useStartTask = () => {
  return useMutation({
    mutationFn: ({ taskId, userId }: { taskId: number, userId: number }) => startTask(taskId, userId),
    onError: (error) => toast.error(error.message)
  })
}
