import { Icon, LucideIcon, LucideProps } from "lucide-react";
import { forwardRef, useId, useMemo } from "react";
import { useNormalizeProgress } from "../use-normalized-progress";
import { cn } from "../util";
import { PieProgressClippingPath } from "./progress-clipping-path/pie";
import { LinearProgressClippingPath } from "./progress-clipping-path/linear";
import {
  useShapeProgressIconNode,
  baseShapeIconNodeParts,
  IconShape,
  shapeLinearProgressRotationDefault,
} from "../shapes";

export const progressIconFillStrategies = ["pie", "linear"] as const;
export type ProgressIconFillStrategy =
  (typeof progressIconFillStrategies)[number];

export type RawProgressIconProps = LucideProps & {
  progress: number;
  shape: IconShape;
  placeholder?: boolean;
  placeholderOpacity?: number;
  fillStrategy: ProgressIconFillStrategy;
  rotate?: number;
};

export const RawProgressIcon = forwardRef<SVGSVGElement, RawProgressIconProps>(
  (
    {
      progress,
      shape,
      fillStrategy,
      rotate: _rotate,
      placeholder = false,
      placeholderOpacity = 0.1,
      ...props
    },
    ref
  ) => {
    const innerId = useId();
    const clipPathId = useId();
    const baseShapeIconNodePart = baseShapeIconNodeParts[shape];
    const rotate =
      _rotate ?? shapeLinearProgressRotationDefault[fillStrategy][shape];

    const iconNode = useShapeProgressIconNode(
      baseShapeIconNodePart,
      innerId,
      clipPathId,
      placeholder,
      placeholderOpacity
    );

    const ProgressClippingPath =
      fillStrategy === "pie"
        ? PieProgressClippingPath
        : LinearProgressClippingPath;

    return (
      <Icon iconNode={iconNode} {...props} ref={ref}>
        <ProgressClippingPath
          progress={progress}
          id={clipPathId}
          rotate={rotate}
          cx={12}
          cy={12}
        />
      </Icon>
    );
  }
);
RawProgressIcon.displayName = "RawProgressIcon";

export const FullProgressIcon = forwardRef<
  SVGSVGElement,
  LucideProps & { shape: IconShape; placeholder?: boolean }
>(({ shape, placeholder = false, ...props }, ref) => {
  const baseShapeIconNodePart = baseShapeIconNodeParts[shape];
  const iconNode = useShapeProgressIconNode(
    baseShapeIconNodePart,
    undefined,
    undefined,
    placeholder
  );
  return <Icon iconNode={iconNode} {...props} ref={ref} />;
});
FullProgressIcon.displayName = "FullProgressIcon";

export const EmptyProgressIcon = forwardRef<
  SVGSVGElement,
  LucideProps & { shape: IconShape; placeholder?: boolean }
>(({ shape, placeholder = false, ...props }, ref) => {
  const baseShapeIconNodePart = baseShapeIconNodeParts[shape];
  const _iconNode = useShapeProgressIconNode(
    baseShapeIconNodePart,
    undefined,
    undefined,
    placeholder
  );
  const iconNode = useMemo(() => _iconNode.slice(0, -1), [_iconNode]);
  return <Icon iconNode={iconNode} {...props} ref={ref} />;
});
EmptyProgressIcon.displayName = "EmptyProgressIcon";

export type ProgressIconProps = RawProgressIconProps & {
  emptyIcon?: LucideIcon;
  fullIcon?: LucideIcon;
  emptyClassName?: string;
  fullClassName?: string;
};

export const ProgressIcon = forwardRef<SVGSVGElement, ProgressIconProps>(
  (
    {
      shape,
      fillStrategy,
      progress,
      emptyIcon,
      fullIcon,
      className,
      emptyClassName,
      fullClassName,
      ...props
    },
    ref
  ) => {
    const EmptyIcon = emptyIcon ?? EmptyProgressIcon;
    const FullIcon = fullIcon ?? FullProgressIcon;
    const ProgressIcon = RawProgressIcon;

    const normalizedProgress = useNormalizeProgress(progress, 100);

    return normalizedProgress <= 0 ? (
      <EmptyIcon
        shape={shape}
        {...props}
        className={cn(className, emptyClassName)}
        ref={ref}
      />
    ) : normalizedProgress >= 1 ? (
      <FullIcon
        shape={shape}
        {...props}
        className={cn(className, fullClassName)}
        ref={ref}
      />
    ) : (
      <ProgressIcon
        shape={shape}
        fillStrategy={fillStrategy}
        progress={normalizedProgress}
        {...props}
        className={cn(className)}
        ref={ref}
      />
    );
  }
);
ProgressIcon.displayName = "ProgressIcon";
