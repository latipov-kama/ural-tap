import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

import Badge from '../../components/ui/badge/Badge';
import Button from '../../components/ui/button/Button';

import repeat from "../../assets/repeat.svg";
import sparkles from "../../assets/sparkles.svg";
import voltage from "../../assets/voltage.svg";

import { useApplyBoost, useBoostById } from '../../hooks/query/boosts';
import { useAuthStore } from '../../stores/auth';
import { useScoreStore } from '../../stores/score';
import toast from 'react-hot-toast';
import { EffectType } from '../../types/boosts';

const Boost = () => {
  const [isActive, setIsActive] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState(300);

  const { id } = useParams();
  const { balance, updateBalance } = useScoreStore();
  const { user, userId, fetchUser } = useAuthStore();

  const boostId = id ? +id : 0;

  const { data: boost } = useBoostById(boostId);
  const { mutate: applyBoost } = useApplyBoost();

  const resetTapsTodayCount = user?.ActiveBoost?.filter(
    (boost) => boost.effectType === EffectType.RESET_TAPS
  ).length || 0;

  const isResetTaps = boost?.effectType === EffectType.RESET_TAPS;
  const isResetTapsLimitReached = isResetTaps && resetTapsTodayCount >= 6;

  const isAlreadyActive = !isResetTaps && user?.ActiveBoost?.some((activeBoost) => activeBoost.effectType === boost?.effectType);

  const handleComplete = () => {
    if (!boost || !userId) return;

    if (isResetTapsLimitReached) {
      toast.error("Вы достигли лимита на сегодня");
      return;
    }

    if (balance < boost.cost) {
      toast.error("Недостаточно монет!");
      return;
    }

    applyBoost({ boostId: boost.id, userId }, {
      onSuccess: () => {
        setIsActive(true);
        setShowConfetti(true);
        setConfettiPieces(300);

        if (boost.cost) {
          updateBalance(balance - boost.cost);
        }

        fetchUser(userId);

        setTimeout(() => {
          let count = 200;
          const interval = setInterval(() => {
            count -= 10;
            setConfettiPieces(count);
            if (count <= 0) {
              clearInterval(interval);
              setShowConfetti(false);
            }
          }, 100);
        }, 2000);
      }
    });
  };

  if (!boost) {
    return <p>Буст не найден.</p>;
  }

  return (
    <div className="h-full flex items-center justify-center relative overflow-hidden">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={confettiPieces}
          recycle={false}
          gravity={0.3}
        />
      )}

      <motion.div
        className="w-2/3 pb-7 flex flex-col items-center rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          background: isActive || isAlreadyActive
            ? "linear-gradient(90deg, #6788d5 0%, #937cef 100%)"
            : "linear-gradient(360deg, rgba(226, 236, 255, 0.045) 0%, rgba(226, 236, 255, 0.15) 100%)",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="gradient_circle w-[72px] h-[72px] rounded-full flex items-center justify-center relative -top-4">
          <img src={repeat} alt="repeat" className="w-11" />
        </div>

        <h2 className="mb-3 text-[22px] text-center text-balance leading-7 px-4">
          {boost.title}
        </h2>

        <Badge className="mb-4 w-fit !bg-none !shadow-none">
          <img src={sparkles} alt="sparkles" className="w-6 h-6" />
          {isActive || isAlreadyActive ? `-${boost.cost}` : boost.cost}
        </Badge>

        <Button
          onClick={handleComplete}
          disabled={isAlreadyActive || isResetTapsLimitReached || isActive}
          className={
            isAlreadyActive || isResetTapsLimitReached || isActive
              ? "gradient_btn_active disabled:opacity-90"
              : ""
          }
        >
          <img src={voltage} alt="sparkles" className="w-5 h-5" />
          {isAlreadyActive || isResetTapsLimitReached || isActive
            ? "Буст применён"
            : "Прокачать"}
        </Button>
      </motion.div>
    </div>
  );
};

export default Boost;
