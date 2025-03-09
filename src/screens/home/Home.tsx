import { useEffect, useRef, useCallback } from "react";
import { useScoreStore } from "../../stores/score";
import { useAuthStore } from "../../stores/auth";
import HomeProfile from "../../components/home-profile/HomeProfile";
import CoinsTap from "../../components/coins-tap/CoinsTap";
import TapsIndicator from "../../components/taps-indicator/TapsIndicator";
import { useInterpolatedTaps } from "../../hooks/useInterpolatedTaps";
import { useUpdateBalance, useUpdateEnergy } from "../../hooks/query/taps";
import { useLevelQuery, useUpdateXp } from "../../hooks/query/levels";

const Home: React.FC = () => {
  const { user } = useAuthStore();
  const { balance, addTaps, resetPendingTaps } = useScoreStore();

  const { mutate: updateBalanceMutation } = useUpdateBalance();
  const { mutate: updateEnergyMutation } = useUpdateEnergy();
  const { mutate: updateXPMutation } = useUpdateXp();
  const { refetch } = useLevelQuery(user?.id ?? 0)

  const { taps: interpolatedTaps, debouncedTaps, tap } = useInterpolatedTaps(user?.id ?? 0);

  const prevTapsRef = useRef<number>(debouncedTaps);

  useEffect(() => {
    if (!user || debouncedTaps <= 0 || debouncedTaps === prevTapsRef.current) return;

    prevTapsRef.current = debouncedTaps;

    updateBalanceMutation(
      { userId: user.id, balance: debouncedTaps },
      {
        onSuccess: () => {
          updateEnergyMutation(
            { userId: user.id, amount: debouncedTaps },
            {
              onSuccess: () => {
                updateXPMutation(
                  { userId: user.id, xp: debouncedTaps },
                  {
                    onSuccess: () => {
                      resetPendingTaps()
                      refetch()
                    },
                  }
                );
              },
              onError: (error) => console.error("Ошибка при обновлении энергии:", error),
            }
          );
        },
        onError: (error) => console.error("Ошибка при обновлении баланса:", error),
      }
    );
  }, [debouncedTaps, updateBalanceMutation, updateEnergyMutation, updateXPMutation, user]);

  const handleTap = useCallback(() => {
    if (interpolatedTaps >= 5) {
      tap(5);
      addTaps(5);
    }
  }, [interpolatedTaps, tap, addTaps]);

  return (
    <div className="p-5 py-8 h-full flex flex-col justify-between">
      {user && (
        <>
          <HomeProfile firstName={user.firstName} userId={user.id} />
          <CoinsTap onTap={handleTap} balance={balance} isDisabled={interpolatedTaps < 5} />
          <TapsIndicator taps={Math.ceil(interpolatedTaps)} />
        </>
      )}
    </div>
  );
};

export default Home;
