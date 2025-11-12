import type { Metadata } from "next";
import { Jost } from "next/font/google";

import { cn } from "@/lib/utils";

import "./globals.css";

import { Providers } from "@/providers";

const font = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Storewise - Build. Sell. Scale",
    default: "Storewise - Build. Sell. Scale",
  },
};

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-sans antialiased", font.variable)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
