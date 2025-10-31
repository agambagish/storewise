import Link from "next/link";

import { Github, Instagram } from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

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
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://github.com/agambagish/storewise"
                target="_blank"
              >
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#">
                <Instagram className="h-5 w-5" />
              </Link>
            </Button>
            <div className="mx-1 h-6 w-px bg-border" />
            <ModeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
