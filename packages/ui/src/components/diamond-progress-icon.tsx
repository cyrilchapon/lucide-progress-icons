import { Diamond, Icon, LucideIcon, LucideProps } from "lucide-react";
import { forwardRef } from "react";
import { useNormalizeProgress } from "../use-normalized-progress";
import {
  diamondFullDiscIconNode,
  diamondFullDiscCheckIconNode,
} from "../shapes/diamond";
import { cn } from "../util";
import { useDiamondProgressIconNode } from "../shapes/diamond";

export type RawProgressDiamondProps = LucideProps & {
  progress: number;
};

export const RawProgressDiamond = forwardRef<
  SVGSVGElement,
  RawProgressDiamondProps
>(({ progress, ...props }, ref) => {
  const iconNode = useDiamondProgressIconNode(progress);

  return <Icon iconNode={iconNode} {...props} ref={ref} />;
});
RawProgressDiamond.displayName = "RawProgressDiamond";

export const FullProgressDiamond = forwardRef<SVGSVGElement, LucideProps>(
  (props, ref) => (
    <Icon iconNode={diamondFullDiscIconNode} {...props} ref={ref} />
  )
);
FullProgressDiamond.displayName = "FullProgressDiamond";

export const FullProgressDiamondCheck = forwardRef<SVGSVGElement, LucideProps>(
  (props, ref) => (
    <Icon iconNode={diamondFullDiscCheckIconNode} {...props} ref={ref} />
  )
);
FullProgressDiamondCheck.displayName = "FullProgressDiamondCheck";

export type ProgressDiamondProps = RawProgressDiamondProps & {
  emptyIcon?: LucideIcon;
  fullIcon?: LucideIcon;
  emptyClassName?: string;
  fullClassName?: string;
};

export const ProgressDiamond = forwardRef<SVGSVGElement, ProgressDiamondProps>(
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
    const EmptyIcon = emptyIcon ?? Diamond;
    const FullIcon = fullIcon ?? FullProgressDiamond;
    const ProgressIcon = RawProgressDiamond;

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
ProgressDiamond.displayName = "ProgressDiamond";
