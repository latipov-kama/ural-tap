import { create } from "zustand";

const baseLevelScore = 50

const levels = new Array(10)
  .fill(0)
  .map((_, i) => baseLevelScore * Math.pow(2, i))

// console.log(levels);

export const useScoreStore = create((set) => ({
  count: 0,
  // increase: () => set((state: any) => ({ count: state.count + 1 })),
  // reset: () => set({ count: 0 })
}))