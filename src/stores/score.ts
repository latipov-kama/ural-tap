import { create } from "zustand";

interface ScoreState {
  coins: number;
  level: number;
  levels: number[];
  addCoins: (amount: number) => void;
  reset: () => void;
}

const baseLevelScore = 100;
const levels = new Array(10).fill(0).map((_, i) => baseLevelScore * Math.pow(2, i));

export const useScoreStore = create<ScoreState>((set) => ({
  coins: 100, // Начальное количество монет, 100 по умолчанию
  level: 1, // Начальный уровень, 1 по умолчанию
  levels, // Define levels array

  addCoins: (amount) =>
    set((state) => {
      const newCoins = state.coins + amount;

      // Определяем новый уровень: находим первый уровень, для которого количество монет больше или равно
      const newLevel = state.levels.reduce((level, score, index) => {
        if (newCoins >= score) {
          return index + 1;
        }
        return level;
      }, 1); // Начинаем с уровня 1

      return {
        coins: newCoins,
        level: newLevel,
      };
    }),

  reset: () => set({ coins: 100, level: 1 }), // Сбросим на начальные значения
}));
