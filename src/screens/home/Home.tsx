import { useEffect, useRef, useCallback, useState, useMemo } from "react";
import { useScoreStore } from "../../stores/score";
import { useAuthStore } from "../../stores/auth";
import { useInterpolatedTaps } from "../../hooks/useInterpolatedTaps";
import { useUpdateEnergy } from "../../hooks/query/taps";
import { useLevelQuery, useUpdateXp } from "../../hooks/query/levels";

import HomeProfile from "../../components/home-profile/HomeProfile";
import CoinsTap from "../../components/coins-tap/CoinsTap";
import TapsIndicator from "../../components/taps-indicator/TapsIndicator";
import Confetti from "react-confetti";
import toast from "react-hot-toast";
import ActiveBoostBadge from "../../components/active-boost-badge/ActiveBoostBadge";

const Home: React.FC = () => {
  const { user, photoUrl } = useAuthStore();
  const { balance, addTaps } = useScoreStore();

  const { mutate: updateEnergyMutation } = useUpdateEnergy();
  const { mutate: updateXPMutation } = useUpdateXp();
  const { data: level, refetch } = useLevelQuery(user?.id ?? 0);
  const tapCount = level?.tapCount ?? 0

  const { taps, debouncedTaps, maxTaps, tap, isTapDisabled } =
    useInterpolatedTaps(user?.id ?? 0, tapCount);

  const prevTapsRef = useRef<number>(debouncedTaps);
  const prevLevelRef = useRef<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const filteredBoosts = useMemo(() => {
    return user?.ActiveBoost?.filter(boost => boost.effectType !== "resetTaps") || [];
  }, [user]);

  useEffect(() => {
    if (!user || !level) return;

    if (prevLevelRef.current !== null && level.level > prevLevelRef.current) {
      setShowConfetti(true);
      toast.success(
        `Ваш уровень повышен до ${level.level}!`,
        { icon: "👏", position: "top-center" }
      );

      setTimeout(() => setShowConfetti(false), 3000);
    }
    prevLevelRef.current = level.level;
  }, [level, user]);

  useEffect(() => {
    if (!user || debouncedTaps <= 0 || debouncedTaps === prevTapsRef.current) return;

    console.log("Updating energy and XP:", debouncedTaps);
    setTimeout(() => {
      prevTapsRef.current = debouncedTaps;
    }, 100);

    updateEnergyMutation(
      { userId: user.id, amount: debouncedTaps },
      {
        onSuccess: () => {
          updateXPMutation(
            { userId: user.id, xp: debouncedTaps },
            {
              onSuccess: () => {
                refetch();
              },
            }
          );
        },
      }
    );
  }, [debouncedTaps, updateEnergyMutation, updateXPMutation, user]);

  const memoizedTapCount = useMemo(() => tapCount, [tapCount]);

  const handleTap = useCallback(() => {
    if (!isTapDisabled) {
      tap();
      addTaps(memoizedTapCount);
    }
  }, [isTapDisabled, tap, addTaps, memoizedTapCount]);

  return (
    <div className="p-5 py-8 h-full flex flex-col justify-between relative">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          <Confetti width={window.innerWidth} height={window.innerHeight} numberOfPieces={200} recycle={false} gravity={0.3} />
        </div>
      )}

      {user && (
        <>
          <HomeProfile firstName={user.firstName} userId={user.id} photoUrl={photoUrl ?? ""} />
          <CoinsTap onTap={handleTap} balance={balance} isDisabled={isTapDisabled} tapCount={tapCount} />
          <ActiveBoostBadge activeBoosts={filteredBoosts} />
          <TapsIndicator taps={Math.ceil(taps)} maxTaps={maxTaps} />
        </>
      )}
    </div>
  );
};

export default Home;