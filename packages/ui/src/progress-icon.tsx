import { Circle, Icon, IconNode, LucideIcon } from "lucide-react";
import { ComponentProps, FunctionComponent, useMemo } from "react";
import { pointInCircle } from "./use-progress-position";
import { useNormalizeProgress } from "./use-normalized-progress";

// This is the working base with 25%
// 'M12,12 L12,6 A6,6 0 0 1 18,12 Z'

type IconNodePart = IconNode[number];

const circleIconNodePart: IconNodePart = [
  "circle",
  { cx: "12", cy: "12", r: "10", key: "1mglay" },
];

const fullDiscIconNodePart: IconNodePart = [
  "circle",
  {
    cx: "12",
    cy: "12",
    r: "6",
    fill: "currentColor",
    strokeWidth: "0",
    key: "1mglay",
  },
];

const basePieSvgAttrs: Record<string, string> = {
  fill: "currentColor",
  strokeWidth: "0",
  strokeLinecap: "butt",
};

const getPieIconNodePart = (progress: number, key: string) => {
  const [x, y] = pointInCircle(
    {
      center: [12, 12],
      radius: 6,
    },
    progress
  );

  const pieIconNodePart: IconNodePart = [
    "path",
    {
      d: `M12,12 L12,6 A6,6 0 ${progress > 0.5 ? 1 : 0} 1 ${x},${y} Z`,
      ...basePieSvgAttrs,
      key,
    },
  ];

  return pieIconNodePart;
};

const usePieIconNodePart = (progress: number, key: string) => {
  const pieIconNodePart = useMemo<IconNodePart | null>(
    () =>
      progress <= 0
        ? null
        : progress >= 1
          ? fullDiscIconNodePart
          : getPieIconNodePart(progress, key),
    [progress, key]
  );

  return pieIconNodePart;
};

const useCircleProgressIconNode = (progress: number) => {
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

export type RawProgressCircleProps = ComponentProps<LucideIcon> & {
  progress: number;
};

const RawProgressCircle: FunctionComponent<RawProgressCircleProps> = ({
  progress,
  ...props
}) => {
  const iconNode = useCircleProgressIconNode(progress);

  return <Icon iconNode={iconNode} {...props} />;
};

export type ProgressCircleProps = RawProgressCircleProps & {
  emptyIcon?: LucideIcon;
  fullIcon?: LucideIcon;
};

export const ProgressCircle: FunctionComponent<ProgressCircleProps> = ({
  progress,
  emptyIcon: EmptyIcon = Circle,
  fullIcon: FullIcon = ,
  ...props
}) => {
  const normalizedProgress = useNormalizeProgress(progress, 100);

  return normalizedProgress <= 0 ? (
    <EmptyIcon {...props} />
  ) : normalizedProgress >= 1 ? (
    <FullIcon {...props} />
  ) : (
    <Icon iconNode={iconNode} {...props} />
  );
};
