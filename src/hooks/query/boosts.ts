import { useMutation, useQuery } from "@tanstack/react-query"
import { Boost } from "../../types/boosts"
import { applyBoostEffect, getBoostById, getBoosts } from "../../services/boostsApi"
import toast from "react-hot-toast"

export const useBoosts = () => {
  return useQuery<Boost[]>({
    queryKey: ["boost-items"],
    queryFn: getBoosts,
  })
}

export const useBoostById = (id: number) => {
  return useQuery<Boost>({
    queryKey: ["boost-items", id],
    queryFn: () => getBoostById(id),
    enabled: !!id
  })
}

export const useApplyBoost = () => {
  return useMutation({
    mutationFn: ({ boostId, userId }: { boostId: number, userId: number }) => applyBoostEffect(boostId, userId)
  })
}
