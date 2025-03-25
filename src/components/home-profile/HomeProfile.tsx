import React from 'react'
import LevelProgress from '../level-progress/LevelProgress'
import { useLevelQuery } from '../../hooks/query/levels'
import { useNavigate } from 'react-router-dom'

interface props {
  firstName?: string
  userId: number
  photoUrl?: string
}

const HomeProfile: React.FC<props> = ({ firstName, userId, photoUrl }) => {
  const navigate = useNavigate()
  const { data } = useLevelQuery(userId)

  const level = data?.level ?? 1;
  const xp = data?.xp ?? 0;
  const xpToNextLevel = data?.xpToNextLevel ?? 500;

  return (
    <div className="px-4 pt-4 rounded-xl gradient_bg bg-red-500">
      <div
        className="flex items-center gap-4"
        onClick={() => navigate("/profile")}
      >
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#6788D5] to-[#937CEF]">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Avatar"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-xl">👤</span>
          )}
        </div>
        <div>
          <h2>{firstName}</h2>
          <div className="flex items-center gap-1">
            <span className="text-sm text-secondary">Уровень {level}</span>
          </div>
        </div>
      </div>
      <div className="w-full h-1.5 mt-3 bg-[#E2ECFF35] rounded-3xl overflow-hidden">
        <LevelProgress xp={xp} xpToNextLevel={xpToNextLevel} />
      </div>
    </div>
  )
}

export default HomeProfile