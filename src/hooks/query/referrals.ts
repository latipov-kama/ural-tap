import { useQuery } from "@tanstack/react-query";
import makeRequest from "../../services/api";

const fetchReferralLink = async (userId: number) => {
  if (!userId) throw new Error("User ID отсутствует");
  const response = await makeRequest.get<{ link: string }>(`/referrals/referral-link?${userId}`);
  return response.data.link;
};

export const useReferralLink = (userId?: number) => {
  return useQuery({
    queryKey: ["referralLink", userId],
    queryFn: () => fetchReferralLink(userId!),
    enabled: !!userId
  });
};
