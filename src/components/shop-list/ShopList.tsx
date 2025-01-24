import { Link } from "react-router-dom"
import repeat from "../../assets/repeat.svg"
import sparkles from "../../assets/sparkles.svg"
import voltage from "../../assets/voltage.svg"
import Button from "../ui/button/Button"

const ShopList = () => {
  const shop = [
    {
      id: 1,
      title: "Обнуление счётчика тапов",
      price: 100
    },
    {
      id: 2,
      title: "Удвоенные баллы от тапов",
      price: 500
    },
  ]

  return (
    <div className='py-8 grid grid-cols-2 gap-3'>
      {
        shop.map((item, idx) => (
          <Link to={`${item.id}`} key={idx} className='gradient_bg p-4 flex flex-col items-center rounded-2xl'>
            <div className="gradient_circle w-12 h-12 rounded-full flex items-center justify-center">
              <img src={repeat} alt="repeat" className="w-8 h-8" />
            </div>

            <p className="mt-3 text-center leading-4 text-sm font-medium">{item.title}</p>
            <div className="mb-3 mt-2 flex items-center gap-1">
              <img src={sparkles} alt="sparkles" className="w-5 h-5" />
              <span className="text-sm">{item.price}</span>
            </div>

            <Button>
              <img src={voltage} alt="voltage" className="w-5 h-5" />
              Прокачать
            </Button>
          </Link>
        ))
      }
    </div >
  )
}

export default ShopList