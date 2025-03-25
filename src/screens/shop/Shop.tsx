import { useState } from "react"
import BottomSheet from "../../components/bottom-sheet/BottomSheet"
import ShopItem from "../../components/shop-item/ShopItem"
import { Image } from "../../types"
import toast from "react-hot-toast"

export interface Item {
  title: string
  description: string
  cost: number
  image: Image
  createdAt?: string
  expiresAt: string
}

const data: Item[] = [{
  title: "Iphone 16 Pro",
  description: "Lorem ipsum dolor sit amet.",
  cost: 10000,
  image: { id: 1, url: "" },
  expiresAt: "",
  createdAt: ""
}]

const Shop = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  const handleOpen = (item: Item) => {
    setSelectedItem(item)
    setIsOpen(true)
  }

  return (
    <div className='p-5 py-8 h-full'>
      <h2 className='text-3xl font-semibold mb-2'>Участвуй в розыгрышах</h2>
      <p className='text-sm text-secondary'>Выбери интересующий розыгрыш</p>

      <div className="py-8 grid grid-cols-2 gap-3">
        {
          data.map((item, idx) => (
            <ShopItem
              key={idx}
              item={item}
              handleOpen={handleOpen}
            />
          ))
        }
      </div>

      <BottomSheet<Item>
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