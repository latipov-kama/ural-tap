import Badge from "../../components/ui/badge/Badge";
import sparkles from "../../assets/sparkles.svg"
import friend from "../../assets/friend.svg"
import { useReferrals } from "../../hooks/query/referrals";

interface props {
  userId: number
}

const FriendsList: React.FC<props> = ({ userId }) => {
  const { data } = useReferrals(userId)

  return (
    <div className="mt-10">
      <div className="">
        <h2 className="text-lg font-medium">
          Друзья <span className="text-[#8D7DEB]">(3)</span>
        </h2>
      </div>

      <div className="py-5">
        {data?.map((item) => (
          <div
            key={item.invitee.firstname}
            className="gradient_bg flex items-center justify-between gap-3 mt-2 p-4 rounded-2xl"
          >
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden">
                <img src={friend} alt="friend" className="w-full h-full object-cover" />
              </div>
              <div className="">
                <p className="text-sm text-[#B6C2DA]">
                  {item.invitee.firstname}
                </p>
              </div>
            </div>

            <Badge className="text-sm">
              <img src={sparkles} alt="sparkles" className="w-5 h-5" />
              250
            </Badge>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FriendsList