import { useMemo } from "react";

export type GeoPoint = [number, number];
export type GeoCircle = { center: GeoPoint; radius: number };

const progressToRadian = (progress: number): number => Math.PI * 2 * progress;

export const pointInCircle = (
  circle: GeoCircle,
  progress: number
): GeoPoint => {
  const radianProgress = progressToRadian(progress);

  const point: GeoPoint = [
    circle.radius * Math.cos(radianProgress - Math.PI / 2) + circle.center[0],
    circle.radius * Math.sin(radianProgress - Math.PI / 2) + circle.center[1],
  ];

  return point;
};

export const useProgressCirclePosition = (
  progress: number,
  cx: number,
  cy: number,
  r: number
) => {
  const destination = useMemo(() => {
    const point = pointInCircle(
      {
        center: [cx, cy],
        radius: r,
      },
      progress
    );

    return point;
  }, [progress, cx, cy, r]);

  return destination;
};
