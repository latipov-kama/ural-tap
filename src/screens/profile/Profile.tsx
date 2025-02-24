import sparkles from "../../assets/sparkles.svg";
import notification from "../../assets/notification.svg";
import questions from "../../assets/questions.svg";
import privacy_policy from "../../assets/privacy-policy.svg";
import book from "../../assets/book.svg";
import { ChevronRight } from "lucide-react";
import Toggle from "../../components/ui/toggle/Toggle";
import { useState } from "react";
import { Link } from "react-router-dom";
import LevelProgress from "../../components/level-progress/LevelProgress";
import { useAuthStore } from "../../stores/auth";
import profile from "../../assets/friend.svg"
import { useLevelQuery } from "../../hooks/query/levels";

const Profile = () => {
  const arr = [
    {
      title: "Вопросы и ответы",
      icon: questions,
      route: "/profile/questions"
    },
    {
      title: "Политика конфиденциальности",
      icon: privacy_policy,
      route: "/"
    },
    {
      title: "О приложении",
      icon: book,
      route: "/"
    },
  ];
  // const { user } = useTelegramAuth()
  const { user } = useAuthStore()
  const { data: level } = useLevelQuery(user?.id ?? 0)
  const [notificationOn, setNotificationOn] = useState(false);

  const handleToggle = () => {
    setNotificationOn(!notificationOn);
  };

  return (
    <div className="p-5 py-8 h-full">
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full overflow-clip">
          <img src={profile} alt="friend" className="w-full h-full object-cover" />
        </div>
        <h2 className="mt-3 text-lg font-medium">{user?.firstName}</h2>
        <p className="text-secondary mt-1 text-sm">Уровень {level?.level}</p>

        <div className="max-w-72 w-full mt-3">
          <LevelProgress xp={level?.xp ?? 1} xpToNextLevel={level?.xpToNextLevel ?? 500} />
        </div>

        <div className="flex items-center gap-4 mt-6">
          <img src={sparkles} alt="sparkles" className="" />
          <p className="text-3xl font-semibold">{user?.balance.toLocaleString()}</p>
        </div>
      </div>

      <div className="py-8">
        <div
          className="flex items-center justify-between py-4 border-t border-[#8DA0C63D]"
          onClick={() => handleToggle()}
        >
          <div className="flex gap-4">
            <img
              src={notification}
              alt="notification"
              className="w-6 h-6"
            />
            <p>Уведомления</p>
          </div>
          <div>
            <Toggle isOn={notificationOn} />
          </div>
        </div>
        {arr.map((item: { title: string; icon: string, route: string }, idx: number) => (
          <Link
            to={item.route}
            key={idx}
            className="flex items-center justify-between py-4 border-t border-[#8DA0C63D]"
          >
            <div className="flex gap-4">
              <img
                src={item.icon}
                alt="notification"
                className="w-6 h-6"
              />
              <p>{item.title}</p>
            </div>
            <div>
              <ChevronRight color="#8DA0C6" size={25} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Profile;
