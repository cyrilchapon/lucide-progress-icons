import { Icon, LucideIcon, LucideProps, Hexagon } from "lucide-react";
import { forwardRef } from "react";
import { useNormalizeProgress } from "../use-normalized-progress";
import {
  hexagonFullDiscIconNode,
  hexagonFullDiscCheckIconNode,
  useHexagonProgressIconNode,
} from "../shapes/hexagon";
import { cn } from "../util";

export type RawProgressHexagonProps = LucideProps & {
  progress: number;
};

export const RawProgressHexagon = forwardRef<
  SVGSVGElement,
  RawProgressHexagonProps
>(({ progress, ...props }, ref) => {
  const iconNode = useHexagonProgressIconNode(progress);

  return <Icon iconNode={iconNode} {...props} ref={ref} />;
});
RawProgressHexagon.displayName = "RawProgressHexagon";

export const FullProgressHexagon = forwardRef<SVGSVGElement, LucideProps>(
  (props, ref) => (
    <Icon iconNode={hexagonFullDiscIconNode} {...props} ref={ref} />
  )
);
FullProgressHexagon.displayName = "FullProgressHexagon";

export const FullProgressHexagonCheck = forwardRef<SVGSVGElement, LucideProps>(
  (props, ref) => (
    <Icon iconNode={hexagonFullDiscCheckIconNode} {...props} ref={ref} />
  )
);
FullProgressHexagonCheck.displayName = "FullProgressHexagonCheck";

export type ProgressHexagonProps = RawProgressHexagonProps & {
  emptyIcon?: LucideIcon;
  fullIcon?: LucideIcon;
  emptyClassName?: string;
  fullClassName?: string;
};

export const ProgressHexagon = forwardRef<SVGSVGElement, ProgressHexagonProps>(
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
    const EmptyIcon = emptyIcon ?? Hexagon;
    const FullIcon = fullIcon ?? FullProgressHexagon;
    const ProgressIcon = RawProgressHexagon;

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
ProgressHexagon.displayName = "ProgressHexagon";
