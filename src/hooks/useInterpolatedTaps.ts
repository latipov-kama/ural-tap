import { useState, useEffect, useCallback, useRef } from "react";
import { useTapsQuery } from "./query/taps";
import { useDebounce } from "use-debounce";

export const useInterpolatedTaps = (userId: number, tapCount: number) => {
  const { data, refetch } = useTapsQuery(userId);
  const [taps, setTaps] = useState(0);
  const [pendingTaps, setPendingTaps] = useState(0);
  const [debouncedTaps] = useDebounce(pendingTaps, 500);
  const [maxTaps, setMaxTaps] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");
  const [isRegenerating, setIsRegenerating] = useState(false);

  const lastUpdate = useRef(Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!data) return;

    const { taps: serverTaps, maxTaps, nextRegen } = data;
    const currentTaps = serverTaps - pendingTaps;

    setTaps(currentTaps);
    setMaxTaps(maxTaps);
    lastUpdate.current = Date.now();

    if (currentTaps < tapCount) {
      startRegenTimer(nextRegen);
    }
  }, [data, pendingTaps, tapCount]);

  const startRegenTimer = useCallback((nextRegen: number) => {
    if (isRegenerating) return;

    setIsRegenerating(true);
    clearInterval(intervalRef.current!);

    intervalRef.current = setInterval(() => {
      const elapsedTime = Date.now() - lastUpdate.current;
      const remainingTime = nextRegen * 1000 - elapsedTime;

      if (remainingTime <= 0) {
        clearInterval(intervalRef.current!);
        setTimeLeft("");
        setIsRegenerating(false);
        refetch();
      } else {
        setTimeLeft(`${Math.floor(remainingTime / 60000)}:${String(Math.floor((remainingTime % 60000) / 1000)).padStart(2, "0")}`);
      }
    }, 1000);
  }, [isRegenerating, refetch]);

  const tap = useCallback(() => {
    if (taps >= tapCount) {
      setTaps((prev) => prev - tapCount);
      setPendingTaps((prev) => prev + tapCount);
      lastUpdate.current = Date.now();

      if (taps - tapCount < tapCount) startRegenTimer(data?.nextRegen || 0);
    }
  }, [taps, tapCount, data, startRegenTimer]);

  return {
    taps,
    pendingTaps,
    debouncedTaps,
    tap,
    maxTaps,
    isRegenerating,
    timeLeft,
    isTapDisabled: taps < tapCount,
  };
};
