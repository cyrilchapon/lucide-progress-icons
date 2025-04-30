import { IconNode } from "lucide-react";
import { useMemo } from "react";
import {
  boundPolygon,
  GeoPoint,
  GeoPolygon,
  pointInPolygon,
} from "../use-progress-position";
import { basePieSvgAttrs, IconNodePart } from "./common";

export const getBaseDivisions = (polygon: GeoPolygon) => [
  ...polygon.slice(1),
  ...polygon.slice(0, 1),
];

export const getFullPolygonIconNodePart = (
  polygon: GeoPolygon,
  radius: number,
  [cx, cy]: GeoPoint,
  key: string
): IconNodePart => [
  "path",
  {
    d: `M${cx},${cy - radius} ${polygon.map(([dx, dy]) => `L${dx},${dy}`).join(" ")} Z`,
    fill: "currentColor",
    strokeWidth: "0",
    key,
  },
];

export const getPolygonPieIconNodePart = (
  progress: number,
  polygon: GeoPolygon,
  radius: number,
  [cx, cy]: GeoPoint,
  key: string
) => {
  const [[x, y], divisionIndex] = pointInPolygon(polygon, progress);
  const divisions = getBaseDivisions(polygon);
  const divisionsToRetain = divisions.slice(0, divisionIndex + 1);

  const pieIconNodePart: IconNodePart = [
    "path",
    {
      d: `M${cx},${cy} L${cx},${cy - radius} ${divisionsToRetain.map(([dx, dy], i) => (i === divisionIndex ? `L${x},${y}` : `L${dx},${dy}`)).join(" ")} Z`,
      ...basePieSvgAttrs,
      key,
    },
  ];

  return pieIconNodePart;
};

export const makeUsePolygonPieIconNodePart =
  (sides: number, center: GeoPoint, radius: number) =>
  (progress: number, key: string) => {
    const polygon = useMemo(() => boundPolygon({ center, radius }, sides), []);

    const pieIconNodePart = useMemo<IconNodePart | null>(
      () =>
        progress <= 0
          ? null
          : progress >= 1
            ? getFullPolygonIconNodePart(polygon, radius, center, key)
            : getPolygonPieIconNodePart(progress, polygon, radius, center, key),
      [progress, polygon, key]
    );

    return pieIconNodePart;
  };

export const makeUsePolygonProgressIconNode = (
  sides: number,
  center: GeoPoint,
  radius: number,
  outerNodePart: IconNodePart
) => {
  const usePolygonPieIconNodePart = makeUsePolygonPieIconNodePart(
    sides,
    center,
    radius
  );

  return (progress: number) => {
    const pieIconNodePart = usePolygonPieIconNodePart(progress, "gje34k");

    const diamondProgressIconNode = useMemo<IconNode>(
      () => [
        outerNodePart,
        ...(pieIconNodePart != null ? [pieIconNodePart] : []),
      ],
      [pieIconNodePart]
    );

    return diamondProgressIconNode;
  };
};
