import { create } from "zustand";

interface ScoreState {
  balance: number;
  level: number;
  levels: number[];
  addCoins: (amount: number) => void;
  reset: () => void;
}

const baseLevelScore = 100;
const levels = new Array(10).fill(0).map((_, i) => baseLevelScore * Math.pow(2, i));

export const useScoreStore = create<ScoreState>((set) => ({
  balance: 100, // Начальный баланс
  level: 1,
  levels,
  addCoins: (amount) =>
    set((state) => {
      const newBalance = state.balance + amount;

      const newLevel = levels.findIndex((score) => newBalance < score) + 1 || levels.length;

      return {
        balance: newBalance,
        level: newLevel,
      };
    }),

  reset: () => set({ balance: 100, level: 1 }), // Сброс к начальному значению
}));
