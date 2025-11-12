"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="cursor-pointer"
      onClick={() =>
        setTheme((current) => (current === "light" ? "dark" : "light"))
      }
    >
      <Sun className="dark:-rotate-90 size-4 rotate-0 scale-100 transition-all dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
