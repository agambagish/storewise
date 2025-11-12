import { Open_Sans } from "next/font/google";
import Link from "next/link";

import type { LucideProps } from "lucide-react";
import { icons, Store } from "lucide-react";

import { cn } from "@/lib/utils";

const font = Open_Sans({
  subsets: ["latin"],
  weight: ["800"],
});

interface Props {
  name: string;
  href: string;
  color: string;
  icon: string;
}

export function StoreLogo({ name, href, color, icon }: Props) {
  return (
    <Link href={href} className="flex items-center gap-2">
      <div
        className="flex aspect-square size-8 items-center justify-center rounded-lg text-white"
        style={{ backgroundColor: color }}
      >
        <DynamicLucideIcon
          icon={icon}
          className="size-4 text-white dark:text-black"
        />
      </div>
      <span
        className={cn("font-bold text-[22px]", font.className)}
        style={{ color }}
      >
        {name}
      </span>
    </Link>
  );
}

interface DynamicLucideIconProps extends LucideProps {
  icon: string;
}

function DynamicLucideIcon({ icon, ...props }: DynamicLucideIconProps) {
  const iconName = icon
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");

  if (!(iconName in icons)) return <Store {...props} />;

  const Icon = icons[iconName as keyof typeof icons];
  return <Icon {...props} />;
}
