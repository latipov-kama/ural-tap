import sparkles from "../../assets/sparkles.svg";
import notification from "../../assets/notification.svg";
import questions from "../../assets/questions.svg";
import privacy_policy from "../../assets/privacy-policy.svg";
import book from "../../assets/book.svg";
import friend from "../../assets/friend.svg"
import { ChevronRight } from "lucide-react";
import Toggle from "../../components/ui/toggle/Toggle";
import { useState } from "react";

const Profile = () => {
  const arr = [
    {
      title: "Вопросы и ответы",
      icon: questions,
      route: "/"
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
  const [notificationOn, setNotificationOn] = useState(false);

  const handleToggle = () => {
    setNotificationOn(!notificationOn);
  };

  return (
    <div className="p-5 py-8 h-full">
      <div className="flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full overflow-clip">
          <img src={friend} alt="friend" className="w-full h-full object-cover" />
        </div>
        <h2 className="mt-3 text-lg font-medium">Имя или Никнейм</h2>
        <p className="text-secondary mt-1 text-sm">Уровень 27</p>

        <div className="max-w-72 w-full h-1.5 mt-3 bg-[#E2ECFF35] rounded-3xl overflow-hidden">
          <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-[#937CEF] to-[#FFC846]"></div>
        </div>

        <div className="flex items-center gap-4 mt-6">
          <img src={sparkles} alt="sparkles" className="" />
          <p className="text-3xl font-semibold">1 240 400</p>
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
        {arr.map((item: { title: string; icon: string }, idx: number) => (
          <div
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
