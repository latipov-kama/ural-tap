import { useQuery } from "@tanstack/react-query"
import { getRaffles } from "../../services/raffleApi"
import { Raffle } from "../../types/raffles"

export const useRaffles = () => {
  return useQuery<Raffle[]>({
    queryKey: ["raffles"],
    queryFn: getRaffles,
  })
}