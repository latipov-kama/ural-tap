import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchLevel, updateLevelXP } from "../../services/levelsApi"

export const useLevelQuery = (userId: number) => {
  return useQuery({
    queryKey: ["level", userId],
    queryFn: () => fetchLevel(userId),
    enabled: !!userId
  })
}

export const useUpdateXp = () => {
  return useMutation({
    mutationFn: ({ userId, xp }: { userId: number, xp: number }) => updateLevelXP(userId, xp),
    onError: (error) => {
      console.error("Ошибка обновления xp:", error);
    },
  })
}