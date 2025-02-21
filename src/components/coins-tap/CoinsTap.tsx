import { useRef } from "react";
import coinImg from "../../assets/coin.svg";
import sparkles from "../../assets/sparkles.svg";

type CoinsTapProps = {
  balance: number
  onTap: (tapCount: number) => void;
  isDisabled: boolean;
};

const CoinsTap: React.FC<CoinsTapProps> = ({ balance, onTap, isDisabled }) => {
  const coinRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTap = (event: React.TouchEvent<HTMLDivElement>) => {
    if (isDisabled) return;

    const tapCount = 5;
    onTap(tapCount);

    if (coinRef.current) {
      coinRef.current.classList.add("bounce-animation");
      setTimeout(() => coinRef.current?.classList.remove("bounce-animation"), 300);
    }

    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      Array.from(event.touches).forEach((touch) => {
        const offsetX = touch.clientX - rect.left;
        const offsetY = touch.clientY - rect.top;

        const plusOne = document.createElement("div");
        plusOne.className = "plus-one";
        plusOne.textContent = "+1";
        plusOne.style.left = `${offsetX}px`;
        plusOne.style.top = `${offsetY}px`;

        containerRef.current?.appendChild(plusOne);

        setTimeout(() => plusOne.remove(), 2000);
      });
    }
  };

  return (
    <div className="mt-8">
      <div className="flex items-center gap-3 justify-center mb-4">
        <img src={sparkles} alt="sparkles" />
        <p className="text-3xl font-semibold">{balance}</p>
      </div>
      <div
        className={`w-56 h-56 mx-auto relative ${isDisabled ? "pointer-events-none opacity-50" : ""
          }`}
        ref={containerRef}
        onTouchStart={handleTap}
      >
        <img
          src={coinImg}
          alt="Coin"
          ref={coinRef}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
};

export default CoinsTap;
