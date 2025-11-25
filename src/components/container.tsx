import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const variants = cva("mx-auto max-w-7xl", {
  variants: {
    height: {
      full: "h-screen",
      auto: "h-auto",
      storefront: "h-[calc((100vh-8rem)-2px)]",
      dashboard: "h-[calc(100vh-3.5rem)]",
    },
    direction: {
      row: "flex flex-row",
      col: "flex flex-col",
    },
    gap: {
      none: "gap-0",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-8",
    },
    paddingDirection: {
      both: "p-4 sm:p-6 lg:p-8",
      x: "px-4 sm:px-6 lg:px-8",
      y: "py-4 sm:py-6 lg:py-8",
      none: "",
    },
    content: {
      center: "items-center justify-center",
      normal: "",
    },
  },
  defaultVariants: {
    height: "auto",
    direction: "col",
    gap: "none",
    paddingDirection: "both",
    content: "normal",
  },
});

type Props = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof variants>;

export function Container({
  className,
  height,
  direction,
  gap,
  paddingDirection,
  content,
  children,
  ...props
}: Props) {
  return (
    <div
      className={cn(
        variants({ height, direction, gap, paddingDirection, content }),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
