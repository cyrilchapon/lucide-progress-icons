import { IconNode } from "lucide-react";
import { checkIconNodePart, IconNodePart } from "./common";
import {
  getFullPolygonIconNodePart,
  makeUsePolygonProgressIconNode,
} from "./polygon";
import { boundPolygon, GeoCircle } from "../use-progress-position";

const box: GeoCircle = { center: [12, 12], radius: 6.5 };

export const hexagonIconNodePart: IconNodePart = [
  "path",
  {
    d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
    key: "yt0hxn",
  },
];

export const baseHexagonPolygon = boundPolygon(box, 6);
export const fullHexagonIconNodePart = getFullPolygonIconNodePart(
  baseHexagonPolygon,
  box.radius,
  box.center,
  "ln8ssz"
);

export const hexagonFullDiscIconNode: IconNode = [
  hexagonIconNodePart,
  fullHexagonIconNodePart,
];

export const hexagonFullDiscCheckIconNode: IconNode = [
  hexagonIconNodePart,
  fullHexagonIconNodePart,
  checkIconNodePart,
];

export const useHexagonProgressIconNode = makeUsePolygonProgressIconNode(
  6,
  box.center,
  box.radius,
  hexagonIconNodePart
);
