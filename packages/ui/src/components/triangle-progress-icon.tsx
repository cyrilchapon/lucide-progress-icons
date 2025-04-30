import { Triangle, Icon, LucideIcon, LucideProps } from "lucide-react";
import { forwardRef } from "react";
import { useNormalizeProgress } from "../use-normalized-progress";
import {
  triangleFullDiscIconNode,
  triangleFullDiscCheckIconNode,
  useTriangleProgressIconNode,
} from "../shapes/triangle";
import { cn } from "../util";

export type RawProgressTriangleProps = LucideProps & {
  progress: number;
};

export const RawProgressTriangle = forwardRef<
  SVGSVGElement,
  RawProgressTriangleProps
>(({ progress, ...props }, ref) => {
  const iconNode = useTriangleProgressIconNode(progress);

  return <Icon iconNode={iconNode} {...props} ref={ref} />;
});
RawProgressTriangle.displayName = "RawProgressTriangle";

export const FullProgressTriangle = forwardRef<SVGSVGElement, LucideProps>(
  (props, ref) => (
    <Icon iconNode={triangleFullDiscIconNode} {...props} ref={ref} />
  )
);
FullProgressTriangle.displayName = "FullProgressTriangle";

export const FullProgressTriangleCheck = forwardRef<SVGSVGElement, LucideProps>(
  (props, ref) => (
    <Icon iconNode={triangleFullDiscCheckIconNode} {...props} ref={ref} />
  )
);
FullProgressTriangleCheck.displayName = "FullProgressTriangleCheck";

export type ProgressTriangleProps = RawProgressTriangleProps & {
  emptyIcon?: LucideIcon;
  fullIcon?: LucideIcon;
  emptyClassName?: string;
  fullClassName?: string;
};

export const ProgressTriangle = forwardRef<
  SVGSVGElement,
  ProgressTriangleProps
>(
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
    const EmptyIcon = emptyIcon ?? Triangle;
    const FullIcon = fullIcon ?? FullProgressTriangle;
    const ProgressIcon = RawProgressTriangle;

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
ProgressTriangle.displayName = "ProgressTriangle";
