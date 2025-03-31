import { useMutation, useQuery } from "@tanstack/react-query"
import { getRaffles, joinToRaffle } from "../../services/raffleApi"
import { Raffle } from "../../types/raffles"
import toast from "react-hot-toast"

export const useRaffles = () => {
  return useQuery<Raffle[]>({
    queryKey: ["raffles"],
    queryFn: getRaffles,
  })
}

export const useJoinToRaffle = () => {
  return useMutation({
    mutationFn: ({ raffleId, userId }: { raffleId: number, userId: number }) => joinToRaffle(raffleId, userId),
    onError: (error) => toast.error(error.message)
  })
}