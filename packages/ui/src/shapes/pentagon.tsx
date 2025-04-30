import { IconNode } from "lucide-react";
import { checkIconNodePart, IconNodePart } from "./common";
import {
  getFullPolygonIconNodePart,
  makeUsePolygonProgressIconNode,
} from "./polygon";
import { boundPolygon, GeoCircle } from "../use-progress-position";

const box: GeoCircle = { center: [12, 11.75], radius: 6 };

export const pentagonIconNodePart: IconNodePart = [
  "path",
  {
    d: "M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z",
    key: "2hea0t",
  },
];

export const basePentagonPolygon = boundPolygon(box, 5);
export const fullPentagonIconNodePart = getFullPolygonIconNodePart(
  basePentagonPolygon,
  box.radius,
  box.center,
  "ln8ssz"
);

export const pentagonFullDiscIconNode: IconNode = [
  pentagonIconNodePart,
  fullPentagonIconNodePart,
];

export const pentagonFullDiscCheckIconNode: IconNode = [
  pentagonIconNodePart,
  fullPentagonIconNodePart,
  checkIconNodePart,
];

export const usePentagonProgressIconNode = makeUsePolygonProgressIconNode(
  5,
  box.center,
  box.radius,
  pentagonIconNodePart
);
