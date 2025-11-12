import type { Metadata } from "next";
import { Jost } from "next/font/google";

import { cn } from "@/lib/utils";

import "./globals.css";

const font = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Storewise - Build. Sell. Scale",
    default: "Storewise - Build. Sell. Scale",
  },
};

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("antialiased", font.className)}>{children}</body>
    </html>
  );
}
