import { useMutation, useQuery } from "@tanstack/react-query"
import { fetchLevel, updateLevelXP } from "../../services/levelsApi"
import toast from "react-hot-toast"

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
    onError: (error) => toast.error(error.message)
  })
}