import { useQuery } from "@tanstack/react-query";
import { fetchReferralLink, fetchReferrals } from "../../services/referralsApi";

export const useReferralLink = (userId?: number) => {
  return useQuery({
    queryKey: ["referralLink", userId],
    queryFn: () => fetchReferralLink(userId!),
    enabled: !!userId
  }); 
};

export const useReferrals = (userId: number) => {
  return useQuery({
    queryKey: ["referrals", userId],
    queryFn: () => fetchReferrals(userId)
  })
} 