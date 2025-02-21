import { useEffect } from "react";
import { useScoreStore } from "../../stores/score";
import { useAuthStore } from "../../stores/auth";
import HomeProfile from "../../components/home-profile/HomeProfile";
import CoinsTap from "../../components/coins-tap/CoinsTap";
import TapsIndicator from "../../components/taps-indicator/TapsIndicator";
import { useInterpolatedTaps } from "../../hooks/useInterpolatedTaps";
import { useDebounce } from "use-debounce";
import { useUpdateBalance } from "../../hooks/query/taps";

function Home() {
  const { user } = useAuthStore();
  const { balance, setBalance, addCoins } = useScoreStore();
  const { mutate: updateBalance } = useUpdateBalance();

  const interpolatedTaps = useInterpolatedTaps(53);

  const [debouncedBalance] = useDebounce(balance, 1000);

  useEffect(() => {
    if (user?.balance !== undefined) {
      setBalance(user.balance);
    }
  }, [user?.balance, setBalance]);

  useEffect(() => {
    if (user && debouncedBalance !== user.balance) {
      updateBalance({ userId: user.id, balance: debouncedBalance });
    }
  }, [debouncedBalance, updateBalance, user]);
  console.log(balance);

  const handleTap = (tapCount: number) => {
    if (interpolatedTaps >= tapCount) {
      addCoins(tapCount);
    }
  };

  return (
    <div className="p-5 py-8 h-full flex flex-col justify-between">
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
