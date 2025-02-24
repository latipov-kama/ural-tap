import { useQuery } from "@tanstack/react-query"
import { fetchLevel } from "../../services/levelsApi"

export const useLevelQuery = (userId: number) => {
  return useQuery({
    queryKey: ["level", userId],
    queryFn: () => fetchLevel(userId),
    enabled: !!userId
  })
}