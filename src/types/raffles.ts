import { Image } from "."

export interface Raffle {
  id: number
  title: string
  description: string
  price: number
  imageId: number | null
  endDate: string
  status: string
  image: Image
  createdAt?: string
  updatedAt?: string
}

export interface RaffleParticipant {
  raffle: {
    id: number
    endDate: string
    status: string
  }
}