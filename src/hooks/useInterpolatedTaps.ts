import { useState, useEffect, useCallback } from "react";
import { useTapsQuery } from "./query/taps";
import { useDebounce } from "use-debounce";

export const useInterpolatedTaps = (userId: number, tapCount: number) => {
  const { data, refetch } = useTapsQuery(userId);
  const [taps, setTaps] = useState(0);
  const [pendingTaps, setPendingTaps] = useState(0);
  const [debouncedTaps] = useDebounce(pendingTaps, 500);
  const [maxTaps, setMaxTaps] = useState(0);

  useEffect(() => {
    if (!data) return;

    setTaps(data.taps - (pendingTaps > data.taps ? 0 : pendingTaps));
    setMaxTaps(data.maxTaps);
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 1000);

    return () => clearInterval(interval);
  }, [refetch]);

  useEffect(() => {
    if (debouncedTaps > 0) {
      setPendingTaps(0);
    }
  }, [debouncedTaps]);

  const tap = useCallback(() => {
    if (taps >= tapCount) {
      setTaps((prev) => prev - tapCount);
      setPendingTaps((prev) => prev + 1);
    }
  }, [taps, tapCount]);

  return {
    taps,
    pendingTaps,
    debouncedTaps,
    tap,
    maxTaps,
    isTapDisabled: taps < tapCount,
  };
};
