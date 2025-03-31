import { useState } from "react"
import BottomSheet from "../../components/bottom-sheet/BottomSheet"
import ShopItem from "../../components/shop-item/ShopItem"
import toast from "react-hot-toast"
import { useJoinToRaffle, useRaffles } from "../../hooks/query/raffles"
import { Raffle } from "../../types/raffles"
import { useAuthStore } from "../../stores/auth"
import { useScoreStore } from "../../stores/score"

const Shop = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Raffle | null>(null)
  const { userId, user, fetchUser } = useAuthStore();
  const { balance, updateBalance } = useScoreStore();

  const { data: raffles } = useRaffles()
  const { mutate: joinToRaffle } = useJoinToRaffle()
  const raffleParticipant = user?.RaffleParticipant

  const handleOpen = (item: Raffle, isParticipant: boolean) => {
    if (!isParticipant) {
      setSelectedItem(item)
      setIsOpen(true)
    } else {
      toast.error(`Вы уже учавствуете!`)
    }
  }

  const handleJoin = () => {
    if (!selectedItem || !userId) return

    joinToRaffle({ raffleId: selectedItem.id, userId: userId }, {
      onSuccess: async ({ data }) => {
        if (selectedItem.price) {
          updateBalance(balance + selectedItem.price);
        }
        fetchUser(userId);
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
          raffles?.map((item, idx) => {
            const isParticipant = raffleParticipant?.some(participant => participant.raffle.id == item.id);
            return (

              <ShopItem
                key={idx}
                raffle={item}
                handleOpen={handleOpen}
                isParticipant={isParticipant}
              />
            )
          })
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