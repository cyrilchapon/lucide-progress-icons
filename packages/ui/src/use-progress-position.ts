import { useMemo } from "react";

export type GeoPoint = [number, number];
export type GeoLine = [GeoPoint, GeoPoint];
export type GeoSegment = [GeoPoint, GeoPoint];
export type GeoPolygon = GeoPoint[];
export type GeoSquare = [GeoPoint, GeoPoint, GeoPoint, GeoPoint];
export type GeoTriangle = [GeoPoint, GeoPoint, GeoPoint];
export type GeoCircle = { center: GeoPoint; radius: number };

export const progressInRange = (
  [start, end]: [start: number, end: number],
  progress: number
) => start + (end - start) * progress;

export const pointInSegment = (
  segment: [GeoPoint, GeoPoint],
  progress: number
): GeoPoint => {
  const [[xStart, yStart], [xEnd, yEnd]] = segment;

  const x = progressInRange([xStart, xEnd], progress);
  const y = progressInRange([yStart, yEnd], progress);

  return [x, y];
};

export const boundPolygon = (
  baseCircle: GeoCircle,
  sides: number,
): GeoPolygon => {
  const {
    radius: baseRadius,
    center: [xCenter, yCenter],
  } = baseCircle;

  // Dynamic radius to keep consistent height across shapes
  const basePaddedRadius = baseRadius;
  const basePaddedDiameter = basePaddedRadius * 2;
  const radiusFactor = sides % 2 === 0 ? 2 : 1 + Math.cos(Math.PI / sides);
  const polygonRadius = basePaddedDiameter / radiusFactor;
  const step = (2 * Math.PI) / sides;

  // Shift bottom after radius adjustment to keep top point aligned
  const shift = polygonRadius - basePaddedDiameter / 2;

  const startAngle = -90 * (Math.PI / 180);

  const polygon = new Array(sides)
    .fill(null)
    .reduce<GeoPolygon>((acc, _v, side) => {
      const angleRad = side * step + startAngle;
      const nextPoint: GeoPoint = [
        xCenter + polygonRadius * Math.cos(angleRad),
        yCenter + shift + polygonRadius * Math.sin(angleRad),
      ];
      return [...acc, nextPoint];
    }, []);

  return polygon;
};

export const getPolygonSegments = (polygon: GeoPolygon): GeoSegment[] =>
  polygon.map<GeoSegment>((v, i, p) => [v, p[(i + 1) % p.length]!]);

export const getPolygonSegment = (
  polygon: GeoPolygon,
  segmentIndex: number
): [GeoPoint, GeoPoint] => [
  polygon[segmentIndex % polygon.length]!,
  polygon[(segmentIndex + 1) % polygon.length]!,
];

export const pointInPolygon = (
  polygon: GeoPolygon,
  progress: number
  // easing: (time: number) => number = (time) => time
): [GeoPoint, number] => {
  const divisionIndex = Math.floor(progress * polygon.length);
  const progressInDivision =
    (progress - (1 / polygon.length) * divisionIndex) * polygon.length;

  const segment = getPolygonSegment(polygon, divisionIndex);

  const point = pointInSegment(segment, progressInDivision);

  return [point, divisionIndex];
};

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

export const useProgressPolygonPosition = (
  progress: number,
  polygon: GeoPolygon
) => {
  const destination = useMemo(() => {
    const point = pointInPolygon(polygon, progress);

    return point;
  }, [progress, polygon]);

  return destination;
};
