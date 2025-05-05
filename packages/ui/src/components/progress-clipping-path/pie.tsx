import { FunctionComponent, useMemo } from "react";
import { pointInCircle } from "../../use-progress-position";
import { baseInnerRadius } from "../../shapes/common";
import { ProgressClippingPathProps } from "./common";

export const PieProgressClippingPath: FunctionComponent<
  ProgressClippingPathProps
> = ({ progress, rotate, cx = 12, cy = 12, ...props }) => {
  const paddedInnerRadius = baseInnerRadius * 2;

  const [x, y] = useMemo(
    () =>
      pointInCircle(
        {
          center: [cx, cy],
          radius: paddedInnerRadius,
        },
        progress
      ),
    [progress, paddedInnerRadius, cx, cy]
  );

  const largeArc = progress > 0.5 ? 1 : 0;

  return (
    <clipPath {...props}>
      <path
        d={`M${cx},${cy} L${cx},${cy - paddedInnerRadius} A${paddedInnerRadius},${paddedInnerRadius} 0 ${largeArc} 1 ${x},${y} Z`}
        transform={`rotate(${rotate}, ${cx}, ${cy})`}
      />
    </clipPath>
  );
};
