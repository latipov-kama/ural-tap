import { create } from "zustand";

interface ScoreState {
  balance: number;
  pendingTaps: number;
  level: number;
  addTaps: (taps: number) => void;
  updateBalance: (balance: number) => void;
  resetPendingTaps: () => void;
  // applyPendingTaps: () => void;
}

const baseLevelScore = 0;
const levels = Array.from({ length: 10 }, (_, i) => 100 * 2 ** i);

export const useScoreStore = create<ScoreState>((set) => ({
  balance: baseLevelScore,
  pendingTaps: 0,
  level: 1,
  levels,

  addTaps: (taps) =>
    set((state) => ({
      balance: state.balance + taps, // Увеличиваем баланс в UI
      pendingTaps: state.pendingTaps + taps, // Накапливаем для отправки
      level: levels.findIndex((score) => state.balance < score) + 1 || levels.length,
    })),

  updateBalance: (balance) =>
    set(() => ({
      balance,
      level: levels.findIndex((score) => balance < score) + 1 || levels.length,
    })),
  resetPendingTaps: () => set({ pendingTaps: 0 }),

  // applyPendingTaps: () =>
  //   set((state) => ({
  //     pendingTaps: 0, // После отправки обнуляем pendingTaps
  //   })),
}));
