import { Pentagon, Icon, LucideIcon, LucideProps } from "lucide-react";
import { forwardRef } from "react";
import { useNormalizeProgress } from "../use-normalized-progress";
import {
  pentagonFullDiscIconNode,
  pentagonFullDiscCheckIconNode,
  usePentagonProgressIconNode,
} from "../shapes/pentagon";
import { cn } from "../util";

export type RawProgressPentagonProps = LucideProps & {
  progress: number;
};

export const RawProgressPentagon = forwardRef<
  SVGSVGElement,
  RawProgressPentagonProps
>(({ progress, ...props }, ref) => {
  const iconNode = usePentagonProgressIconNode(progress);

  return <Icon iconNode={iconNode} {...props} ref={ref} />;
});
RawProgressPentagon.displayName = "RawProgressPentagon";

export const FullProgressPentagon = forwardRef<SVGSVGElement, LucideProps>(
  (props, ref) => (
    <Icon iconNode={pentagonFullDiscIconNode} {...props} ref={ref} />
  )
);
FullProgressPentagon.displayName = "FullProgressPentagon";

export const FullProgressPentagonCheck = forwardRef<SVGSVGElement, LucideProps>(
  (props, ref) => (
    <Icon iconNode={pentagonFullDiscCheckIconNode} {...props} ref={ref} />
  )
);
FullProgressPentagonCheck.displayName = "FullProgressPentagonCheck";

export type ProgressPentagonProps = RawProgressPentagonProps & {
  emptyIcon?: LucideIcon;
  fullIcon?: LucideIcon;
  emptyClassName?: string;
  fullClassName?: string;
};

export const ProgressPentagon = forwardRef<
  SVGSVGElement,
  ProgressPentagonProps
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
    const EmptyIcon = emptyIcon ?? Pentagon;
    const FullIcon = fullIcon ?? FullProgressPentagon;
    const ProgressIcon = RawProgressPentagon;

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
ProgressPentagon.displayName = "ProgressPentagon";
