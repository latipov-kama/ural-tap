import Button from "../../components/ui/button/Button"
import voltage from "../../assets/voltage.svg";
import sparkles from "../../assets/sparkles.svg";
import Badge from "../../components/ui/badge/Badge";
import { Raffle } from "../../types/raffles";

interface props {
  raffle: Raffle
  handleOpen: (item: Raffle, isParticipant: boolean) => void
  isParticipant?: boolean
}

const ShopItem: React.FC<props> = ({ raffle, handleOpen, isParticipant }) => {
  return (
    <div className="gradient_bg p-4 flex flex-col rounded-2xl">
      <div className="flex items-center justify-between gap-2">
        <div className="gradient_circle w-10 h-10 rounded-lg flex items-center justify-center">
          {raffle.image?.url && <img src={raffle.image?.url} alt="repeat" className="w-7 h-7" />}
        </div>
        <Badge className="!px-2 !py-1 text-xs text-secondary bg-primary text-balance">
          до {new Date(raffle.endDate).toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" })}
        </Badge>
      </div>

      <p className="mt-4 text-lg leading-4 font-medium">
        {raffle.title}
      </p>
      <p className="mt-1 text-xs text-secondary">
        {raffle.description}
      </p>
      <div className="mt-3 flex items-center gap-1">
        <img src={sparkles} alt="sparkles" className="w-5 h-5" />
        <span className="text-sm">{raffle.price.toLocaleString()}</span>
      </div>

      <Button
        className={`mt-3 py-1.5 px-2 flex justify-center text-xs ${isParticipant ? "opacity-60 cursor-not-allowed" : ""
          }`}
        onClick={() => handleOpen(raffle, isParticipant!)}
      >
        <img src={voltage} alt="voltage" className="w-5 h-5" />
        {!isParticipant ? "Участвовать" : "Вы в игре!"}
      </Button>
    </div>
  )
}

export default ShopItem