import { Copy } from "lucide-react";
import Badge from "../../components/ui/badge/Badge";
import Button from "../../components/ui/button/Button";
import man_raising_hand from "../../assets/man-raising-hand.svg";
import sparkles from "../../assets/sparkles.svg"
import friend from "../../assets/friend.png"

const Friends = () => {
  return (
    <div className="p-5 py-8 h-full">
      <h2 className="text-3xl font-semibold mb-2">Пригласи друзей</h2>
      <p className="text-sm text-secondary">
        Ты и твой друг получите бонус в виде дополнительных баллов
      </p>

      <div className="flex items-center gap-3 mt-6">
        <Button>
          Пригласить друзей
          <img src={man_raising_hand} alt="hand" className="w-6 h-6" />
        </Button>
        <Button className="!p-3">
          <Copy size={20} color="#fff" />
        </Button>
      </div>

      <div className="mt-10">
        <div className="">
          <h2 className="text-lg font-medium">
            Друзья <span className="text-[#8D7DEB]">(3)</span>
          </h2>
        </div>

        <div className="py-5">
          {[0, 1, 2].map((item: number) => (
            <div
              key={item}
              className="gradient_bg flex items-center justify-between gap-3 mt-2 p-4 rounded-2xl"
            >
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full flex items-center justify-center overflow-hidden">
                  <img src={friend} alt="friend" className="w-full h-full object-cover" />
                </div>
                <div className="">
                  <p className="text-sm text-[#B6C2DA]">
                    @nickname_of_friend_1
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
    </div>
  );
};

export default Friends;
