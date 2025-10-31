import { Josefin_Sans } from "next/font/google";
import Link from "next/link";

import { Store } from "lucide-react";

import { cn } from "@/lib/utils";

const font = Josefin_Sans({
  subsets: ["latin"],
});

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <span className="mr-2 rounded-lg bg-black p-1 text-white dark:bg-white dark:text-black">
        <Store className="size-[22px]" />
      </span>
      <span className={cn("font-bold text-2xl", font.className)}>
        storewise
      </span>
    </Link>
  );
}
