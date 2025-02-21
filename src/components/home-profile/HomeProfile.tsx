import React from 'react'
import LevelProgress from '../level-progress/LevelProgress'
import { useScoreStore } from '../../stores/score'

interface props {
  firstName?: string
  photoUrl?: string
}

const HomeProfile: React.FC<props> = ({ firstName }) => {
  const { balance, level, levels } = useScoreStore();

  return (
    <div className="px-4 pt-4 rounded-xl gradient_bg bg-red-500">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#6788D5] to-[#937CEF]">
          {/* {user?.photoUrl ? (
              <img
                src={""}
                alt="Avatar"
                className="w-full h-full rounded-full object-cover"
              />
            ) : ( */}
          <span className="text-xl">👤</span>
          {/* )} */}
        </div>
        <div>
          <h2>{firstName}</h2>
          <div className="flex items-center gap-1">
            <span className="text-sm text-secondary">Уровень {level}</span>
          </div>
        </div>
      </div>
      <div className="w-full h-1.5 mt-3 bg-[#E2ECFF35] rounded-3xl overflow-hidden">
        <LevelProgress coins={balance} level={level} levels={levels} />
      </div>
    </div>
  )
}

export default HomeProfile