import { IconNode } from "lucide-react";

export type IconNodePart = IconNode[number];

export const getShapeInnerIconNodePart =
  ([baseIconNodePartElement, baseIconNodePartAttrs]: IconNodePart) =>
  (id?: string, clipPathId?: string, keySuffix?: string): IconNodePart => [
    baseIconNodePartElement,
    {
      ...baseIconNodePartAttrs,
      key: `${baseIconNodePartAttrs.key}${keySuffix}`,
      strokeWidth: "0",
      fill: "currentColor",
      transform: `scale(0.65) translate(${6.5}, ${6.5})`,
      strokeLinecap: "square",
      ...(id != null ? { id } : {}),
      ...(clipPathId != null ? { clipPath: `url(#${clipPathId})` } : {}),
    },
  ];

export const baseInnerRadius = 6.5;
