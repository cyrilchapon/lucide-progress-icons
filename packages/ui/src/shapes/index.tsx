import { getShapeInnerIconNodePart, IconNodePart } from "./common";
import { circleIconNodePart } from "./circle";
import { diamondIconNodePart } from "./diamond";
import { hexagonIconNodePart } from "./hexagon";
import { pentagonIconNodePart } from "./pentagon";
import { useMemo } from "react";
import { ProgressIconFillStrategy } from "../components/progress-icon";
import { squareIconNodePart } from "./square";
import { squircleIconNodePart } from "./squircle";

export const iconShapes = [
  "circle",
  "square",
  "squircle",
  "diamond",
  "pentagon",
  "hexagon",
] as const;
export type IconShape = (typeof iconShapes)[number];

export const baseShapeIconNodeParts: Record<IconShape, IconNodePart> = {
  circle: circleIconNodePart,
  square: squareIconNodePart,
  squircle: squircleIconNodePart,
  diamond: diamondIconNodePart,
  pentagon: pentagonIconNodePart,
  hexagon: hexagonIconNodePart,
};

export const shapeLinearProgressRotationDefault: Record<
  ProgressIconFillStrategy,
  Record<IconShape, number>
> = {
  linear: {
    circle: 180 + 90,
    square: 180 + 45,
    squircle: 180 + 45,
    diamond: 180 + 90,
    pentagon: (360 / 5) * 3,
    hexagon: (360 / 6) * 4,
  },
  pie: {
    circle: 0,
    square: 0,
    squircle: 0,
    diamond: 0,
    pentagon: 0,
    hexagon: 0,
  },
};

export const useShapeInnerIconNodePart = (
  baseShapeIconNodePart: IconNodePart,
  id?: string,
  clipPathId?: string
): IconNodePart => {
  return useMemo(
    () =>
      getShapeInnerIconNodePart(baseShapeIconNodePart)(
        id,
        clipPathId,
        "-inner"
      ),
    [baseShapeIconNodePart, id, clipPathId]
  );
};

export const useShapeInnerPlaceholderIconNodePart = (
  baseShapeIconNodePart: IconNodePart,
  id?: string,
  placeholderOpacity: number = 0.1
): IconNodePart => {
  return useMemo<IconNodePart>(() => {
    const innerShape = getShapeInnerIconNodePart(baseShapeIconNodePart)(
      id,
      undefined,
      "-placeholder"
    );
    return [
      innerShape[0],
      {
        ...innerShape[1],
        fillOpacity: `${placeholderOpacity}`,
      },
    ];
  }, [baseShapeIconNodePart, id, placeholderOpacity]);
};

export const useShapeProgressIconNode = (
  baseShapeIconNodePart: IconNodePart,
  innerId?: string,
  clipPathId?: string,
  placeholder: boolean = false,
  placeholderOpacity: number = 0.1
): [IconNodePart, ...IconNodePart[]] => {
  const shapeInnerIconNodePart = useShapeInnerIconNodePart(
    baseShapeIconNodePart,
    innerId,
    clipPathId
  );
  const shapeInnerPlaceholderIconNodePart =
    useShapeInnerPlaceholderIconNodePart(
      baseShapeIconNodePart,
      innerId,
      placeholderOpacity
    );

  const shapeProgressIconNode = useMemo<[IconNodePart, ...IconNodePart[]]>(
    () =>
      placeholder
        ? [
            baseShapeIconNodePart,
            shapeInnerPlaceholderIconNodePart,
            shapeInnerIconNodePart,
          ]
        : [baseShapeIconNodePart, shapeInnerIconNodePart],
    [
      baseShapeIconNodePart,
      shapeInnerPlaceholderIconNodePart,
      shapeInnerIconNodePart,
      placeholder,
    ]
  );

  return shapeProgressIconNode;
};
