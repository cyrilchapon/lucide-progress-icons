import { useMemo } from "react";
import { clamp, roundToDivision } from "./util";

export const normalizeProgress = (progress: number, division: number) => {
  const clamped = clamp(progress, 0, 1);
  const rounded = roundToDivision(clamped, division);
  return rounded;
};

export const useNormalizeProgress = (progress: number, division: number) => {
  const normalized = useMemo(() => normalizeProgress(progress, division), [progress, division]);

  return normalized;
};
