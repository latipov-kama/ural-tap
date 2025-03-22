import { Link } from "react-router-dom";
import repeat from "../../assets/repeat.svg";
import sparkles from "../../assets/sparkles.svg";
import voltage from "../../assets/voltage.svg";
import Button from "../ui/button/Button";
import { useBoosts } from "../../hooks/query/boosts";
import { useAuthStore } from "../../stores/auth";

const ShopList = () => {
  const { data: boosts } = useBoosts();
  const { user } = useAuthStore();
  const activeBoosts = user?.ActiveBoost;

  console.log(activeBoosts);

  return (
    <div className="py-8 grid grid-cols-2 gap-3">
      {boosts?.map((item, idx) => {
        const isActive = activeBoosts?.some(boost => boost.effectType === item.effectType);

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

            <Button disabled={isActive}>
              <img src={voltage} alt="voltage" className="w-5 h-5" />
              {isActive ? "Активен" : "Прокачать"}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

export default ShopList;
