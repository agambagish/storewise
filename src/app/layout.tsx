import type { Metadata } from "next";
import { Jost } from "next/font/google";

import { cn } from "@/lib/utils";
import { Providers } from "@/providers";

import "@/orpc/server";
import "./globals.css";

const font = Jost({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Storewise - Build. Sell. Scale",
};

export default function ({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={cn("antialiased", font.className)}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
