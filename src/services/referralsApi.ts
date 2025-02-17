import makeRequest from "./api"

interface IReferral {
  id: number
  invitedId: number
  inviteeId: number
  invitee: {
    id: 54,
    firstname: string
  }
  rewardEarned: 0
}

export const fetchReferralLink = async (userId: number) => {
  if (!userId) throw new Error("User ID отсутствует");
  const response = await makeRequest.get<{ link: string }>(`/referrals/referral-link?${userId}`);
  return response.data.link;
};

export const fetchReferrals = async (userId: number) => {
  try {
    const response = await makeRequest.get<IReferral[]>(`/referrals/${userId}`)

    return response.data
  } catch (error) {
    console.error(error);
    throw error;
  }
}