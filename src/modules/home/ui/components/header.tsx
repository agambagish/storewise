"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { useQueryClient } from "@tanstack/react-query";
import { ShoppingBag, User } from "lucide-react";
import { toast } from "sonner";

import { Logo } from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { orpc } from "@/orpc/client";

import { UserDropdown } from "./user-dropdown";

const routes = [
  {
    label: "Products",
    slug: "products",
  },
  {
    label: "Stores",
    slug: "stores",
  },
];

export function Header() {
  const queryClient = useQueryClient();
  const activeSegment = useSelectedLayoutSegment();
  const { data: session, isPending } = authClient.useSession();

  async function handleLogout() {
    await authClient.signOut(
      {},
      {
        onSuccess: () => {
          queryClient.invalidateQueries(orpc.auth.me.queryOptions());
          toast.info("You've been signed out");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo />
            <nav className="hidden items-center gap-6 md:flex">
              <NavigationMenu>
                <NavigationMenuList>
                  {routes.map((item) => (
                    <NavigationMenuItem key={item.slug}>
                      <NavigationMenuLink
                        className={cn(navigationMenuTriggerStyle(), {
                          "bg-accent": activeSegment === item.slug,
                        })}
                        asChild
                      >
                        <Link href={`/${item.slug}`}>{item.label}</Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
          </div>
          {isPending ? (
            <div className="flex items-center gap-2">
              <Skeleton className="size-9" />
              <Skeleton className="size-9" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/cart"
                className={buttonVariants({
                  variant: "ghost",
                  size: "icon",
                })}
              >
                <ShoppingBag />
              </Link>
              {session?.user ? (
                <UserDropdown user={session.user} onLogout={handleLogout} />
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/sign-in"
                      className={buttonVariants({
                        variant: "ghost",
                        size: "icon",
                      })}
                    >
                      <User />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>Sign In</TooltipContent>
                </Tooltip>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
