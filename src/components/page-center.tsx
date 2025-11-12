import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const variants = cva("flex items-center justify-center", {
  variants: {
    height: {
      full: "h-screen",
      content: "h-auto",
      storefront: "h-[calc((100vh-8rem)-2px)]",
      // TODO: Add dashboard
    },
    direction: {
      row: "flex-row",
      col: "flex-col",
    },
    gap: {
      none: "gap-0",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-8",
    },
  },
  defaultVariants: {
    height: "storefront",
    direction: "col",
    gap: "none",
  },
});

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof variants> {}

export function PageCenter({
  className,
  height,
  direction,
  gap,
  children,
  ...props
}: Props) {
  return (
    <div
      className={cn(variants({ height, direction, gap }), className)}
      {...props}
    >
      {children}
    </div>
  );
}
