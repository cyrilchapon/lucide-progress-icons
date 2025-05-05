import { FunctionComponent, useMemo } from "react";
import { baseInnerRadius } from "../../shapes/common";
import { ProgressClippingPathProps } from "./common";

export const LinearProgressClippingPath: FunctionComponent<
  ProgressClippingPathProps
> = ({ progress, rotate, cx = 12, cy = 12, ...props }) => {
  const paddedInnerRadius = baseInnerRadius + 4;

  const progressHeight = useMemo(
    () => progress * paddedInnerRadius * 2,
    [progress, paddedInnerRadius]
  );

  return (
    <clipPath {...props}>
      <rect
        x={cx - paddedInnerRadius}
        y={cy - paddedInnerRadius}
        width={`${paddedInnerRadius * 2}`}
        height={`${progressHeight}`}
        transform={`rotate(${rotate}, ${cx}, ${cy})`}
        strokeWidth={0}
      />
    </clipPath>
  );
};
