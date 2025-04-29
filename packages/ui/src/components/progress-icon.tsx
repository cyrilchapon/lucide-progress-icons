import { Circle, Icon, LucideIcon, LucideProps } from "lucide-react";
import { forwardRef } from "react";
import { useNormalizeProgress } from "../use-normalized-progress";
import {
  useCircleProgressIconNode,
  circleFullDiscIconNode,
  circleFullDiscCheckIconNode,
} from "../shapes/circle";
import { cn } from "../util";

export type RawProgressCircleProps = LucideProps & {
  progress: number;
};

export const RawProgressCircle = forwardRef<
  SVGSVGElement,
  RawProgressCircleProps
>(({ progress, ...props }, ref) => {
  const iconNode = useCircleProgressIconNode(progress);

  return <Icon iconNode={iconNode} {...props} ref={ref} />;
});
RawProgressCircle.displayName = "RawProgressCircle";

export const FullProgressCircle = forwardRef<SVGSVGElement, LucideProps>(
  (props, ref) => (
    <Icon iconNode={circleFullDiscIconNode} {...props} ref={ref} />
  )
);
FullProgressCircle.displayName = "FullProgressCircle";

export const FullProgressCircleCheck = forwardRef<SVGSVGElement, LucideProps>(
  (props, ref) => (
    <Icon iconNode={circleFullDiscCheckIconNode} {...props} ref={ref} />
  )
);
FullProgressCircleCheck.displayName = "FullProgressCircleCheck";

export type ProgressCircleProps = RawProgressCircleProps & {
  emptyIcon?: LucideIcon;
  fullIcon?: LucideIcon;
  emptyClassName?: string;
  fullClassName?: string;
};

export const ProgressCircle = forwardRef<SVGSVGElement, ProgressCircleProps>(
  (
    {
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
    const EmptyIcon = emptyIcon ?? Circle;
    const FullIcon = fullIcon ?? FullProgressCircle;
    const ProgressIcon = RawProgressCircle;

    const normalizedProgress = useNormalizeProgress(progress, 100);

    return normalizedProgress <= 0 ? (
      <EmptyIcon
        {...props}
        className={cn(className, emptyClassName)}
        ref={ref}
      />
    ) : normalizedProgress >= 1 ? (
      <FullIcon {...props} className={cn(className, fullClassName)} ref={ref} />
    ) : (
      <ProgressIcon
        progress={normalizedProgress}
        {...props}
        className={cn(className)}
        ref={ref}
      />
    );
  }
);
ProgressCircle.displayName = "ProgressCircle";
