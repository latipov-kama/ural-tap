import React from "react";

interface LevelProgressProps {
  xp: number;
  xpToNextLevel: number;
}

const LevelProgress: React.FC<LevelProgressProps> = ({ xp, xpToNextLevel }) => {
  const progress = xpToNextLevel > 0 ? Math.min((xp / xpToNextLevel) * 100, 100) : 0;

  return (
    <div className="w-full h-1.5 bg-[#E2ECFF35] rounded-3xl overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#937CEF] to-[#FFC846] transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default LevelProgress;
