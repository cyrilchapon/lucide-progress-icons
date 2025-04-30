import { IconNode } from "lucide-react";
import { checkIconNodePart, IconNodePart } from "./common";
import {
  getFullPolygonIconNodePart,
  makeUsePolygonProgressIconNode,
} from "./polygon";
import { boundPolygon, GeoCircle } from "../use-progress-position";

const box: GeoCircle = { center: [12, 12.75], radius: 5.25 };

export const triangleIconNodePart: IconNodePart = [
  "path",
  {
    d: "M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",
    key: "14u9p9",
  },
];

export const baseTrianglePolygon = boundPolygon(box, 3);
export const fullTriangleIconNodePart = getFullPolygonIconNodePart(
  baseTrianglePolygon,
  box.radius,
  box.center,
  "ln8ssz"
);

export const triangleFullDiscIconNode: IconNode = [
  triangleIconNodePart,
  fullTriangleIconNodePart,
];

export const triangleFullDiscCheckIconNode: IconNode = [
  triangleIconNodePart,
  fullTriangleIconNodePart,
  checkIconNodePart,
];

export const useTriangleProgressIconNode = makeUsePolygonProgressIconNode(
  3,
  box.center,
  box.radius,
  triangleIconNodePart
);
