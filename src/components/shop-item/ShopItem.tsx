import Button from "../../components/ui/button/Button"
import voltage from "../../assets/voltage.svg";
import sparkles from "../../assets/sparkles.svg";
import repeat from "../../assets/repeat.svg";
import Badge from "../../components/ui/badge/Badge";
import { Item } from "../../screens/shop/Shop";

interface props {
  item: Item
  handleOpen: (item: Item) => void
}

const ShopItem: React.FC<props> = ({ item, handleOpen }) => {
  return (
    <div className="gradient_bg p-4 flex flex-col rounded-2xl">

      <div className="flex items-center justify-between gap-2">
        <div className="gradient_circle w-10 h-10 rounded-full flex items-center justify-center">
          <img src={repeat} alt="repeat" className="w-7 h-7" />
        </div>
        <Badge className="!px-2 !py-1 text-xs text-secondary bg-primary text-balance">
          до 28.03
        </Badge>
      </div>

      <p className="mt-4 text-lg leading-4 font-medium">
        {item.title}
      </p>
      <p className="mt-1 text-xs text-secondary">
        {item.description}
      </p>
      <div className="mt-3 flex items-center gap-1">
        <img src={sparkles} alt="sparkles" className="w-5 h-5" />
        <span className="text-sm">{item.cost.toLocaleString()}</span>
      </div>

      <Button
        className="mt-3 py-1.5 flex justify-center text-xs"
        onClick={() => handleOpen(item)}
      // disabled={isActive}
      >
        <img src={voltage} alt="voltage" className="w-5 h-5" />
        Учавствовать
        {/* {isActive ? "Активен" : "Учавствовать"} */}
      </Button>
    </div>
  )
}

export default ShopItem