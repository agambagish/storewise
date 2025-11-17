"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AlertTriangle, ShieldCheck, UserCircle2 } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  {
    label: "Profile",
    href: "/account",
    icon: UserCircle2,
  },
  {
    label: "Security",
    href: "/account/security",
    icon: ShieldCheck,
  },
  {
    label: "Danger",
    href: "/account/danger",
    icon: AlertTriangle,
  },
];

export default function ({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
        <aside className="space-y-1">
          <div className="mb-8">
            <h1 className="font-semibold text-2xl text-foreground">Account</h1>
            <p className="mt-1 text-muted-foreground text-sm">
              Manage your account info.
            </p>
          </div>
          <nav className="space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  pathname === link.href
                    ? "bg-muted hover:bg-accent"
                    : "hover:bg-accent hover:underline",
                  "w-full justify-start",
                )}
              >
                <link.icon />
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
