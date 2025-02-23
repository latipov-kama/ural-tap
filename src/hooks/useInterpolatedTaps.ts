import { useState, useEffect, useCallback, useRef } from "react";
import { useTapsQuery } from "./query/taps";
import { useDebounce } from "use-debounce";

export const useInterpolatedTaps = (userId: number) => {
  const { data, refetch } = useTapsQuery(userId);
  const [taps, setTaps] = useState(0);
  const [pendingTaps, setPendingTaps] = useState(0);
  const lastUpdate = useRef(Date.now());
  const lastTapsRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [debouncedTaps] = useDebounce(pendingTaps, 500);

  useEffect(() => {
    if (!data) return;

    const { taps: serverTaps, maxTaps, nextRegen, energyIncrement } = data;

    // Начинаем отсчет от текущего значения клиента
    lastTapsRef.current = serverTaps - pendingTaps;
    setTaps(lastTapsRef.current);
    lastUpdate.current = Date.now();

    const regenInterval = 3600 * 1000; // 1 час в миллисекундах
    // const regenEndTime = Date.now() + nextRegen * 1000;

    const updateTaps = () => {
      const now = Date.now();
      const elapsed = now - lastUpdate.current;
      const progressFraction = Math.min((regenInterval - nextRegen * 1000 + elapsed) / regenInterval, 1);
      const interpolatedTaps = Math.min(lastTapsRef.current + progressFraction * energyIncrement, maxTaps);

      setTaps(interpolatedTaps);

      if (progressFraction >= 1) {
        clearInterval(intervalRef.current!);
        setTaps(Math.min(lastTapsRef.current + energyIncrement, maxTaps));
        refetch();
      }
    };

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(updateTaps, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [data, refetch]);

  const tap = useCallback((amount: number) => {
    if (taps >= amount) {
      setTaps((prev) => prev - amount);
      setPendingTaps((prev) => prev + amount);
      lastTapsRef.current -= amount; // ✅ Корректируем референс
      lastUpdate.current = Date.now(); // ✅ Обновляем время последнего изменения
    }
  }, [taps]);

  return { taps, pendingTaps, debouncedTaps, tap };
};
