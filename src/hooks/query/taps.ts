import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchTaps, updateBalance } from "../../services/tapsApi"

export const useTapsQuery = (userId: number) => {
  return useQuery({
    queryKey: ["taps", userId],
    queryFn: () => fetchTaps(userId)
  })
}

interface UpdateParams {
  userId: number,
  balance: number
}

export const useUpdateBalance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, balance }: UpdateParams) => updateBalance(userId, balance),
    onSuccess: (_, { userId }) => {
      console.log('updated');
      queryClient.invalidateQueries({ queryKey: ["balance", userId] });
    },
    onError: (error) => {
      console.error("Ошибка обновления баланса:", error);
    },
  })
}