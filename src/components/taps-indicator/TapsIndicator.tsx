import React from 'react'
import Button from '../ui/button/Button'
import point_up from "../../assets/point-up.svg";
import voltage from "../../assets/voltage.svg";
import Badge from '../ui/badge/Badge';
import { useNavigate } from 'react-router-dom';

interface props {
  taps: number
  maxTaps: number
}

const TapsIndicator: React.FC<props> = ({ taps, maxTaps }) => {
  const navigate = useNavigate()

  return (
    <div className="mt-6 flex justify-between items-center">
      <Badge>
        <img src={point_up} alt="pointer" className="w-4 h-4" />
        <span className="text-sm text-white">{taps}</span>
        <span className="text-sm text-[#B7B7B7]">/{maxTaps}</span>
      </Badge>
      <Button onClick={() => navigate("/shop")}>
        <img src={voltage} className="w-4 h-4" />
        Улучшить
      </Button>
    </div>
  )
}

export default TapsIndicator