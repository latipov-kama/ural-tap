import { create } from "zustand";

interface ScoreState {
  balance: number;
  pendingTaps: number;
  addTaps: (taps: number) => void;
  updateBalance: (balance: number) => void;
}

export const useScoreStore = create<ScoreState>((set) => ({
  balance: 0,
  pendingTaps: 0,

  addTaps: (taps) =>
    set((state) => ({
      balance: state.balance + taps, // Увеличиваем баланс
      pendingTaps: state.pendingTaps + taps, // Копим для отправки
    })),

  updateBalance: (balance) => set({ balance }),
  // resetPendingTaps: () => set({ pendingTaps: 0 }),
}));
