import React from 'react'
import { ActiveBoost, EffectType } from '../../types/boosts'
import Badge from '../ui/badge/Badge'

interface props {
  activeBoosts: ActiveBoost[]
}

const EffectTypeMap: Record<EffectType, string> = {
  [EffectType.DOUBLE_TAP]: "x2 начисление монет",
  [EffectType.INCREASE_REGEN]: "x2 восстановление энергии",
  [EffectType.RESET_TAPS]: "Сброс тапов",
};

const ActiveBoostBadge: React.FC<props> = ({ activeBoosts }) => {
  return (
    <div className="flex gap-1 justify-center flex-col items-center">
      {activeBoosts.map((item: ActiveBoost) => (
        <Badge className="py-1 text-xs text-secondary" key={item.id}>
          <div>
            {EffectTypeMap[item.effectType]}
          </div>
        </Badge>
      ))}
    </div>
  )
}

export default ActiveBoostBadge