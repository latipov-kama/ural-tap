import { useState } from "react"
import BottomSheet from "../../components/bottom-sheet/BottomSheet"
import ShopItem from "../../components/shop-item/ShopItem"
import toast from "react-hot-toast"
import { useJoinToRaffle, useRaffles } from "../../hooks/query/raffles"
import { Raffle } from "../../types/raffles"
import { useAuthStore } from "../../stores/auth"

const Shop = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Raffle | null>(null)
  const { userId } = useAuthStore();

  const { data: raffles } = useRaffles()
  const { mutate: joinToRaffle } = useJoinToRaffle()

  const handleOpen = (item: Raffle) => {
    setSelectedItem(item)
    setIsOpen(true)
  }

  const handleJoin = () => {
    if (!selectedItem || !userId) return

    joinToRaffle({ raffleId: selectedItem.id, userId: userId }, {
      onSuccess: async ({ data }) => {
        toast.success(data.message)
      }
    })

    setIsOpen(false)
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
        onComplete={handleJoin}
      />
    </div>
  )
}

export default Shop