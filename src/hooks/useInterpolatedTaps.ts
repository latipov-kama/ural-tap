import { useState, useEffect } from "react";
import { useTapsQuery } from "./query/taps";

export const useInterpolatedTaps = (userId: number) => {
  const { data, refetch } = useTapsQuery(userId);
  const [interpolatedTaps, setInterpolatedTaps] = useState(data?.taps ?? 0);
  // const regenInterval = 3600

  useEffect(() => {
    if (!data) return;

    const { taps, maxTaps, nextRegen, energyIncrement } = data;

    const startTime = Date.now(); // Время старта интерполяции
    const endTime = startTime + nextRegen * 1000; // Время полного восстановления

    const updateTaps = () => {
      const now = Date.now();
      const progressFraction = Math.min((now - startTime) / (endTime - startTime), 1);
      const newTaps = Math.min(taps + progressFraction * energyIncrement, maxTaps);

      setInterpolatedTaps(newTaps);

      if (progressFraction >= 1) {
        refetch(); // Синхронизируем данные с сервером при завершении интервала
      }
    };

    const interval = setInterval(updateTaps, 1000); // Обновляем каждую секунду

    return () => clearInterval(interval);
  }, [data, refetch]);

  return interpolatedTaps;
};
