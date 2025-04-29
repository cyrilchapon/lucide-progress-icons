import { useMemo } from "react";
import { clamp, roundToDivision } from "./util";

export const useNormalizeProgress = (progress: number, division: number) => {
  const normalized = useMemo(() => {
    const clamped = clamp(progress, 0, 1);
    const rounded = roundToDivision(clamped, division);
    return rounded;
  }, [progress, division]);

  return normalized;
};
