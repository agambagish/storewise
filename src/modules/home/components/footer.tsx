import Link from "next/link";

import { Github, Instagram } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2 space-y-0.5">
            <h3 className="font-semibold">Storewise</h3>
            <p className="text-muted-foreground text-xs">
              ~✨ Cool marketplace for premium digital assets
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/agambagish/storewise"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
              })}
            >
              <Github className="size-4" />
            </Link>
            <Link
              href="https://github.com/agambagish/storewise"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "icon",
              })}
            >
              <Instagram className="size-4" />
            </Link>
            <Separator
              orientation="vertical"
              className="data-[orientation=vertical]:h-4"
            />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
