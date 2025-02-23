import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchTaps, updateBalance, updateEnergy } from "../../services/tapsApi"

export const useTapsQuery = (userId: number) => {
  return useQuery({
    queryKey: ["taps", userId],
    queryFn: () => fetchTaps(userId),
    enabled: !!userId,
  })
}

interface UpdateParams {
  userId: number,
  balance: number
}

export const useUpdateBalance = () => {
  return useMutation({
    mutationFn: ({ userId, balance }: UpdateParams) => updateBalance(userId, balance),
    onError: (error) => {
      console.error("Ошибка обновления баланса:", error);
    },
  })
}

export const useUpdateEnergy = () => {
  return useMutation({
    mutationFn: async ({ userId, amount }: { userId: number, amount: number }) => updateEnergy(userId, amount),
  })
}