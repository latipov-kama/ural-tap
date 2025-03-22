import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchTaps, updateEnergy } from "../../services/tapsApi"
import toast from "react-hot-toast"

export const useTapsQuery = (userId: number) => {
  return useQuery({
    queryKey: ["taps", userId],
    queryFn: () => fetchTaps(userId),
    enabled: !!userId,
  })
}

export const useUpdateEnergy = () => {
  return useMutation({
    mutationFn: async ({ userId, amount }: { userId: number, amount: number }) => updateEnergy(userId, amount),
    onError: (error) => toast.error(error.message)
  })
}