export type ProgressClippingPathProps =
  React.SVGProps<SVGClipPathElement> & {
    progress: number;
    rotate: number;
    cx: number;
    cy: number;
  };
