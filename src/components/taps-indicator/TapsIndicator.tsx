import React from 'react'
import Button from '../ui/button/Button'
import point_up from "../../assets/point-up.svg";
import voltage from "../../assets/voltage.svg";
import Badge from '../ui/badge/Badge';

interface props {
  taps: number
}

const TapsIndicator: React.FC<props> = ({ taps }) => {

  return (
    <div className="mt-8 flex justify-between items-center">
      <Badge>
        <img src={point_up} alt="pointer" className="w-4 h-4" />
        <span className="text-sm text-white">{taps}</span>
        <span className="text-sm text-[#B7B7B7]">/500</span>
      </Badge>
      <Button>
        <img src={voltage} className="w-4 h-4" />
        Улучшить
      </Button>
    </div>
  )
}

export default TapsIndicator