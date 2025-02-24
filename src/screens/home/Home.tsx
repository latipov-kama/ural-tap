import { useEffect } from "react";
import { useScoreStore } from "../../stores/score";
import { useAuthStore } from "../../stores/auth";
import HomeProfile from "../../components/home-profile/HomeProfile";
import CoinsTap from "../../components/coins-tap/CoinsTap";
import TapsIndicator from "../../components/taps-indicator/TapsIndicator";
import { useInterpolatedTaps } from "../../hooks/useInterpolatedTaps";
import { useUpdateBalance, useUpdateEnergy } from "../../hooks/query/taps";
import { retrieveLaunchParams } from "@telegram-apps/sdk";

const Home: React.FC = () => {
  const { user } = useAuthStore();
  const { balance, addTaps, updateBalance, resetPendingTaps } = useScoreStore();
  const { initDataRaw } = retrieveLaunchParams()

  const { mutate: updateBalanceMutation } = useUpdateBalance();
  const { mutate: updateEnergyMutation } = useUpdateEnergy();

  const { taps: interpolatedTaps, debouncedTaps, tap } = useInterpolatedTaps(user?.id ?? 0);

  useEffect(() => {
    if (user?.balance !== undefined) {
      updateBalance(user.balance);
    }
  }, [user?.balance, updateBalance]);

  // ✅ Обновляем баланс и энергию
  useEffect(() => {
    if (user && debouncedTaps > 0) {
      updateBalanceMutation(
        { userId: user.id, balance: debouncedTaps },
        {
          onSuccess: () => {
            updateEnergyMutation(
              { userId: user.id, amount: debouncedTaps },
              {
                onSuccess: resetPendingTaps,
                onError: (error) => console.error("Ошибка при обновлении энергии:", error),
              }
            );
          },
          onError: (error) => console.error("Ошибка при обновлении баланса:", error),
        }
      );
    }
  }, [debouncedTaps, updateBalanceMutation, updateEnergyMutation, user]);

  const handleTap = () => {
    if (interpolatedTaps >= 5) {
      tap(5);
      addTaps(5);
    }
  };

  return (
    <div className="p-5 py-8 h-full flex flex-col justify-between">
      {initDataRaw}
      {user && (
        <>
          <HomeProfile firstName={user.firstName} />
          <CoinsTap onTap={handleTap} balance={balance} isDisabled={interpolatedTaps < 5} />
          <TapsIndicator taps={Math.ceil(interpolatedTaps)} />
        </>
      )}
    </div>
  );
};

export default Home;
