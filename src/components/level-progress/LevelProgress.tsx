import React from "react";

interface LevelProgressProps {
  coins: number;
  level: number;
  levels: number[];
}

const LevelProgress: React.FC<LevelProgressProps> = ({ coins, level, levels }) => {
  const getLevelProgress = () => {
    const levelThreshold = levels[level - 1] || 0;
    const nextLevelThreshold = levels[level] || Infinity;
    const progress = (coins - levelThreshold) / (nextLevelThreshold - levelThreshold);
    return Math.min(progress * 100, 100);
  };

  return (
    <div className="w-full h-1.5 bg-[#E2ECFF35] rounded-3xl overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#937CEF] to-[#FFC846]"
        style={{ width: `${getLevelProgress()}%` }}
      ></div>
    </div>
  );
};

export default LevelProgress;
