export enum TaskType {
  CLICK = 'click',
  SUBSCRIBE = 'subscribe',
  EXTERNAL = 'external',
}

export interface Task {
  id: string
  title: string
  description: string
  taskType: TaskType
  link: string
  reward: number
  createdAt?: string
  updatedAt?: string
}
