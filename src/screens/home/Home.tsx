import CoinsTap from "../../components/coins-tap/CoinsTap";
import point_up from "../../assets/point-up.svg";
import voltage from "../../assets/voltage.svg";
import { useEffect, useState } from "react";

function Home() {
  const [limit, setLimit] = useState(100);
  const [taps, setTaps] = useState(limit);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaps((prev) => (prev < limit ? prev + 1 : prev))
    }, 500);

    return () => clearInterval(interval)
  }, [limit]);

  const handleTap = (tapCount: number) => {
    setTaps((prev) => Math.max(0, prev - tapCount));
  };

  return (
    <div className="p-5 py-8 h-full flex flex-col justify-between">
      <div className="px-4 pt-4 rounded-xl gradient_bg">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center
          bg-gradient-to-r from-[#6788D5] to-[#937CEF]"
          >
            <span className="text-xl">👤</span>
          </div>
          <div>
            <h2 className="">Имя или Никнейм</h2>
            <div className="flex items-center gap-1">
              <span className="text-sm text-[#B5C2DA]">Уровень 27</span>
            </div>
          </div>
        </div>
        <div className="w-full h-1.5 mt-3 bg-[#E2ECFF35] rounded-3xl overflow-hidden">
          <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-[#937CEF] to-[#FFC846]"></div>
        </div>
      </div>

      <CoinsTap onTap={handleTap} isDisabled={taps === 0} />

      <div className="mt-8">
        <div className="flex justify-between items-center ">
          <div className="gradient_bg py-2.5 px-4 rounded-3xl flex items-center">
            <img src={point_up} alt="pointer" className="w-4 h-4 mr-1.5" />
            <span className="text-sm text-white">{taps}</span>
            <span className="text-sm text-[#B7B7B7]">/{limit}</span>
          </div>
          <button className="gradient_btn py-2.5 px-6 rounded-3xl flex items-center text-sm font-semibold">
            <img src={voltage} alt="volt" className="w-4 h-4 mr-2" />
            Улучшить
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
