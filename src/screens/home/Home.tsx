import { useEffect } from "react";
import { useScoreStore } from "../../stores/score";
import { useAuthStore } from "../../stores/auth";
import HomeProfile from "../../components/home-profile/HomeProfile";
import CoinsTap from "../../components/coins-tap/CoinsTap";
import TapsIndicator from "../../components/taps-indicator/TapsIndicator";
import { useInterpolatedTaps } from "../../hooks/useInterpolatedTaps";
import { useDebounce } from "use-debounce";
import { useUpdateBalance } from "../../hooks/query/taps";
import { retrieveLaunchParams } from "@telegram-apps/sdk";

function Home() {
  const { user } = useAuthStore();
  const { balance, pendingTaps, addTaps, updateBalance, resetPendingTaps } = useScoreStore();
  const { mutate: updateBalanceMutation } = useUpdateBalance();
  const [debouncedTaps] = useDebounce(pendingTaps, 1500);
  const { initDataRaw } = retrieveLaunchParams()

  const interpolatedTaps = useInterpolatedTaps(53);

  useEffect(() => {
    if (user?.balance !== undefined) {
      updateBalance(user.balance);
    }
  }, [user?.balance, updateBalance]);

  useEffect(() => {
    if (user && debouncedTaps > 0) {
      updateBalanceMutation(
        { userId: user.id, balance: pendingTaps },
        { onSuccess: resetPendingTaps }
      );
    }
  }, [debouncedTaps, updateBalanceMutation, user, pendingTaps, resetPendingTaps]);

  const handleTap = () => {
    if (interpolatedTaps >= 5) {
      addTaps(5);
    }
  };

  return (
    <div className="p-5 py-8 h-full flex flex-col justify-between">
      {initDataRaw}
      {user && (
        <>
          <HomeProfile firstName={user.firstName} />
          <CoinsTap onTap={handleTap} balance={balance} isDisabled={interpolatedTaps === 0} />
          <TapsIndicator taps={interpolatedTaps} />
        </>
      )}
    </div>
  );
}

export default Home;
