import { Link } from "react-router-dom";
import repeat from "../../assets/repeat.svg";
import sparkles from "../../assets/sparkles.svg";
import voltage from "../../assets/voltage.svg";
import Button from "../ui/button/Button";
import { useBoosts } from "../../hooks/query/boosts";
import { useAuthStore } from "../../stores/auth";
import NotFound from "../ui/not-found/NotFound";
import toast from "react-hot-toast";
import { MouseEvent } from "react";
import { Boost } from "../../types/boosts";

const BoostsList = () => {
  const { data: boosts } = useBoosts();
  const { user } = useAuthStore();
  const activeBoosts = user?.ActiveBoost;

  const filteredBoosts = boosts?.filter((boost) => boost.active);

  const handleClick = (e: MouseEvent, item: Boost, isActive: boolean, isLimitReached: boolean) => {
    if (isLimitReached) {
      e.preventDefault();
      toast.error("Вы достигли лимита на сегодня");
      return;
    }

    if (item.effectType !== "resetTaps" && isActive) {
      e.preventDefault();
      toast.error("Буст уже был применён!");
      return;
    }
  };

  if (!filteredBoosts?.length) return <NotFound title="Бусты временно не доступны" />

  return (
    <div className="py-8 grid grid-cols-2 gap-3">
      {filteredBoosts?.map((item, idx) => {
        const isActive = activeBoosts?.some(boost => boost.effectType === item.effectType);
        const sameTypeBoostsCount = activeBoosts?.filter(boost => boost.effectType === item.effectType).length || 0;
        const isLimitReached = sameTypeBoostsCount >= 6;

        // Для resetTaps специальная логика
        const isResetTaps = item.effectType === "resetTaps";
        const shouldDisable = isResetTaps ? isLimitReached : isActive;

        let buttonText = "Прокачать";
        if (isResetTaps && isLimitReached) buttonText = "Лимит";
        else if (!isResetTaps && isActive) buttonText = "Активен";

        return (
          <Link
            to={`${item.id}`}
            key={idx}
            className="gradient_bg p-4 flex flex-col items-center rounded-2xl"
          >
            <div className="gradient_circle w-12 h-12 rounded-full flex items-center justify-center">
              <img src={repeat} alt="repeat" className="w-8 h-8" />
            </div>

            <p className="mt-3 text-center leading-4 text-sm font-medium">
              {item.title}
            </p>
            <div className="mb-3 mt-2 flex items-center gap-1">
              <img src={sparkles} alt="sparkles" className="w-5 h-5" />
              <span className="text-sm">{item.cost}</span>
            </div>

            <Button
              className={`my-auto ${shouldDisable ? "opacity-60 cursor-not-allowed" : ""}`}
              onClick={(e) => handleClick(e, item, isActive ?? false, isLimitReached)}
            >
              <img src={voltage} alt="voltage" className="w-5 h-5" />
              {buttonText}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

export default BoostsList;
