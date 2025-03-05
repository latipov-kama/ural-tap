export enum TaskType {
  CLICK = 'click',
  SUBSCRIBE = 'subscribe',
  EXTERNAL = 'external',
}

export interface Task {
  id: number
  title: string
  description: string
  taskType: TaskType
  link: string
  reward: number
  createdAt?: string
  updatedAt?: string
}

export interface UserTask {
  id: number
  userId: number
  taskId: number
  status: string
  completedAt?: string
}