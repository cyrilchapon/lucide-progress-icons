import { ComponentProps } from "react";
import { cn } from "../util";

export type DemoGroupProps = ComponentProps<"div"> & {
  title: string;
};

export const DemoGroup = ({
  title,
  className,
  children,
  ...props
}: DemoGroupProps) => (
  <div className={cn("flex flex-col gap-2", className)} {...props}>
    <h3 className="text-lg font-medium">{title}</h3>
    {children}
  </div>
);

export type DemoGroupItemListProps = ComponentProps<"div">;

export const DemoGroupItemList = ({
  className,
  children,
  ...props
}: DemoGroupItemListProps) => (
  <div
    className={cn("grid grid-cols-7 items-center gap-2", className)}
    {...props}
  >
    {children}
  </div>
);
