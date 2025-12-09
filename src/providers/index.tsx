import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Toaster } from "@/components/ui/sonner";

import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <NuqsAdapter>{children}</NuqsAdapter>
      <Toaster toastOptions={{ className: "font-sans" }} richColors />
    </ThemeProvider>
  );
}
