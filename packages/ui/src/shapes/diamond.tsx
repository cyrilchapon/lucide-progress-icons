import { IconNode } from "lucide-react";
import { checkIconNodePart, IconNodePart } from "./common";
import {
  getFullPolygonIconNodePart,
  makeUsePolygonProgressIconNode,
} from "./polygon";
import { boundPolygon, GeoCircle } from "../use-progress-position";

const box: GeoCircle = { center: [12, 12], radius: 6.5 };

export const diamondIconNodePart: IconNodePart = [
  "path",
  {
    d: "M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z",
    key: "1f1r0c",
  },
];

export const baseDiamondPolygon = boundPolygon(box, 4);
export const fullDiamondIconNodePart = getFullPolygonIconNodePart(
  baseDiamondPolygon,
  box.radius,
  box.center,
  "ln8ssz"
);

export const diamondFullDiscIconNode: IconNode = [
  diamondIconNodePart,
  fullDiamondIconNodePart,
];

export const diamondFullDiscCheckIconNode: IconNode = [
  diamondIconNodePart,
  fullDiamondIconNodePart,
  checkIconNodePart,
];

export const useDiamondProgressIconNode = makeUsePolygonProgressIconNode(
  4,
  box.center,
  box.radius,
  diamondIconNodePart
);
