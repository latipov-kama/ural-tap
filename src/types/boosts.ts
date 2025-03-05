export enum EffectType {
  RESET_TAPS = 'resetTaps',
  DOUBLE_TAP = 'doubleTapPoints',
  INCREASE_REGEN = 'increaseRegen'
}

export interface Boost {
  id: number
  title: string
  description: string
  cost: number
  active: boolean
  effectType: EffectType
  effectValue: number
  createdAt?: string
}
