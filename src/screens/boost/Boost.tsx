import React from 'react'
import { useParams } from 'react-router-dom'
import Badge from '../../components/ui/badge/Badge'
import Button from '../../components/ui/button/Button'

import repeat from "../../assets/repeat.svg"
import sparkles from "../../assets/sparkles.svg"
import voltage from "../../assets/voltage.svg"

const Boost = () => {
  const { id } = useParams()

  return (
    <div className='h-full flex items-center justify-center'>
      <div className='gradient_bg w-2/3 pb-7 flex flex-col items-center rounded-2xl'>
        <div className="gradient_circle w-[72px] h-[72px] rounded-full flex items-center justify-center relative -top-4">
          <img src={repeat} alt="repeat" className="w-11" />
        </div>

        <h2 className='mb-3 text-2xl text-center text-balance leading-7'>Обнуление счётчика тапов</h2>
        <Badge className='mb-4 w-fit !bg-none !shadow-none'>
          <img src={sparkles} alt="sparkles" className="w-6 h-6" />
          100
        </Badge>

        <Button>
          <img src={voltage} alt="sparkles" className="w-5 h-5" />
          Прокачать
        </Button>
      </div>
    </div>
  )
}

export default Boost