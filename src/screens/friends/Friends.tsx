
import FriendsList from "../../components/friends-list/FriendsList";
import InviteFriends from "../../components/invite-friends/InviteFriends";
import { useAuthStore } from "../../stores/auth";

const Friends = () => {
  const { user } = useAuthStore()

  return (
    <div className="p-5 py-8 h-full">
      <h2 className="text-3xl font-semibold mb-2">Пригласи друзей</h2>
      <p className="text-sm text-secondary">
        Ты и твой друг получите бонус в виде дополнительных баллов
      </p>
      <InviteFriends referralCode={user?.referralCode ?? ""} userId={user?.id ?? 0} />
      <FriendsList userId={user?.id ?? 0} />
    </div>
  );
};

export default Friends;
