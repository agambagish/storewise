"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  {
    label: "Products",
    slug: "products",
  },
  {
    label: "Stores",
    slug: "stores",
  },
];

export function MainNav() {
  const activeSegment = useSelectedLayoutSegment();

  return (
    <nav className="hidden items-center gap-6 md:flex">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.slug}
          href={`/${link.slug}`}
          className={cn(buttonVariants({ variant: "link" }), {
            "underline underline-offset-4": activeSegment === link.slug,
          })}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
