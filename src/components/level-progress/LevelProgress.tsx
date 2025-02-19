import React from "react";

interface LevelProgressProps {
  coins: number;
  level: number;
  levels: number[];
}

const LevelProgress: React.FC<LevelProgressProps> = ({ coins, level, levels }) => {
  const getLevelProgress = () => {
    if (coins <= 0) return 0; // 🟢 Если баланс 0, прогресс тоже 0%

    if (level <= 1) {
      return levels[0] > 0 ? (coins / levels[0]) * 100 : 0; // ✅ Проверяем levels[0], чтобы не делить на 0
    }

    const levelThreshold = levels[level - 2] || 0;
    const nextLevelThreshold = levels[level - 1] || levels[levels.length - 1];

    if (coins < levelThreshold) return 0;

    const progress = (coins - levelThreshold) / (nextLevelThreshold - levelThreshold);
    return Math.max(0, Math.min(progress * 100, 100));
  };

  return (
    <div className="w-full h-1.5 bg-[#E2ECFF35] rounded-3xl overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#937CEF] to-[#FFC846] transition-all duration-300"
        style={{ width: `${getLevelProgress()}%` }}
      ></div>
    </div>
  );
};

export default LevelProgress;
