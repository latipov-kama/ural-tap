import { useEffect, useRef, useCallback, useState } from "react";
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
import Badge from "../../components/ui/badge/Badge";
import { ActiveBoost, EffectType } from "../../types/boosts";

const Home: React.FC = () => {
  const { user, photoUrl } = useAuthStore();
  const { balance, addTaps, resetPendingTaps } = useScoreStore();

  const { mutate: updateEnergyMutation } = useUpdateEnergy();
  const { mutate: updateXPMutation } = useUpdateXp();
  const { data: level, refetch } = useLevelQuery(user?.id ?? 0);
  const tapCount = level?.tapCount ?? 0

  const { taps, debouncedTaps, maxTaps, tap, isTapDisabled } =
    useInterpolatedTaps(user?.id ?? 0, tapCount);

  const prevTapsRef = useRef<number>(debouncedTaps);
  const prevLevelRef = useRef<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

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

    prevTapsRef.current = debouncedTaps;

    updateEnergyMutation(
      { userId: user.id, amount: debouncedTaps },
      {
        onSuccess: () => {
          updateXPMutation(
            { userId: user.id, xp: debouncedTaps },
            {
              onSuccess: () => {
                prevTapsRef.current = debouncedTaps;
                resetPendingTaps();
                refetch();
              },
            }
          );
        },
      }
    );
  }, [debouncedTaps, updateEnergyMutation, updateXPMutation, user]);

  const handleTap = useCallback(() => {
    if (!isTapDisabled) {
      tap();
      addTaps(tapCount);
    }
  }, [isTapDisabled, tap, addTaps]);

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
          <div className="flex gap-1 justify-center flex-col items-center">
            {user?.ActiveBoost.map((item: ActiveBoost) => (
              <Badge className="py-1 text-xs text-secondary" key={item.id}>
                <div className="">
                  {item.effectType == EffectType.DOUBLE_TAP ? "x2 начисление монет" : null}
                  {item.effectType == EffectType.INCREASE_REGEN ? "x2 восстанволение энергии" : null}
                </div>
              </Badge>
            ))}
          </div>
          <TapsIndicator taps={Math.ceil(taps)} maxTaps={maxTaps} />
        </>
      )}
    </div>
  );
};

export default Home;