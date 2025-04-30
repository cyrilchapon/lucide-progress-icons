import { IconNode } from "lucide-react";
import { useMemo } from "react";
import { pointInCircle } from "../use-progress-position";
import { basePieSvgAttrs, checkIconNodePart, IconNodePart, baseInnerRadius } from "./common";

export const circleIconNodePart: IconNodePart = [
  "circle",
  { cx: "12", cy: "12", r: "10", key: "1mglay" },
];

export const fullDiscIconNodePart: IconNodePart = [
  "circle",
  {
    cx: "12",
    cy: "12",
    r: `${baseInnerRadius}`,
    fill: "currentColor",
    strokeWidth: "0",
    key: "mdk9od",
  },
];

export const circleFullDiscIconNode: IconNode = [
  circleIconNodePart,
  fullDiscIconNodePart,
];

export const circleFullDiscCheckIconNode: IconNode = [
  circleIconNodePart,
  fullDiscIconNodePart,
  checkIconNodePart,
];

export const getPieIconNodePart = (
  progress: number,
  key: string,
  cx: number,
  cy: number,
  r: number
) => {
  const [x, y] = pointInCircle(
    {
      center: [cx, cy],
      radius: r,
    },
    progress
  );
  const largeArc = progress > 0.5 ? 1 : 0;

  const pieIconNodePart: IconNodePart = [
    "path",
    {
      // This is a working base with 25%
      // 'M12,12 L12,6 A6,6 0 0 1 18,12 Z'
      d: `M12,12 L12,${12 - r} A${r},${r} 0 ${largeArc} 1 ${x},${y} Z`,
      ...basePieSvgAttrs,
      key,
    },
  ];

  return pieIconNodePart;
};

export const usePieIconNodePart = (progress: number, key: string) => {
  const pieIconNodePart = useMemo<IconNodePart | null>(
    () =>
      progress <= 0
        ? null
        : progress >= 1
          ? fullDiscIconNodePart
          : getPieIconNodePart(progress, key, 12, 12, baseInnerRadius),
    [progress, key]
  );

  return pieIconNodePart;
};

export const useCircleProgressIconNode = (progress: number) => {
  const pieIconNodePart = usePieIconNodePart(progress, "gje34k");

  const circleProgressIconNode = useMemo<IconNode>(
    () => [
      circleIconNodePart,
      ...(pieIconNodePart != null ? [pieIconNodePart] : []),
    ],
    [pieIconNodePart]
  );

  return circleProgressIconNode;
};
