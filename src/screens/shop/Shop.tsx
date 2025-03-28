import { useState } from "react"
import BottomSheet from "../../components/bottom-sheet/BottomSheet"
import ShopItem from "../../components/shop-item/ShopItem"
import toast from "react-hot-toast"
import { useRaffles } from "../../hooks/query/raffles"
import { Raffle } from "../../types/raffles"

const Shop = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Raffle | null>(null)
  const { data: raffles } = useRaffles()

  const handleOpen = (item: Raffle) => {
    setSelectedItem(item)
    setIsOpen(true)
  }

  return (
    <div className='p-5 py-8 h-full'>
      <h2 className='text-3xl font-semibold mb-2'>Участвуй в розыгрышах</h2>
      <p className='text-sm text-secondary'>Выбери интересующий розыгрыш</p>

      <div className="py-8 grid grid-cols-2 gap-3">
        {
          raffles?.map((item, idx) => (
            <ShopItem
              key={idx}
              raffle={item}
              handleOpen={handleOpen}
            />
          ))
        }
      </div>

      <BottomSheet<Raffle>
        isShow={isOpen}
        setIsShow={setIsOpen}
        actionLabel="Учавствовать"
        item={selectedItem}
        onComplete={() => toast.success("Вы в списке участников!")}
      />
    </div>
  )
}

export default Shop