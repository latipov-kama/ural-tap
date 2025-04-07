import React from 'react'
import LevelProgress from '../level-progress/LevelProgress'
import { useLevelQuery } from '../../hooks/query/levels'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeIn" }}
      className="px-4 pt-4 rounded-xl gradient_bg">
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
    </motion.div>
  )
}

export default HomeProfile