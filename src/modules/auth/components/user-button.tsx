"use client";

import Link from "next/link";

import { LayoutDashboard, LogOut, Store, User, UserPen } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth/client";
import { cn } from "@/lib/utils";

export function UserButton() {
  const { isPending, data: ctx } = authClient.useSession();

  if (isPending) return <Skeleton className="size-8" />;

  if (!ctx) {
    return (
      <Link href="/sign-in" className={buttonVariants({ size: "icon-sm" })}>
        <User />
      </Link>
    );
  }

  async function onSignOut() {
    await authClient.signOut(
      {},
      {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          toast.success("You have been signed out.");
        },
      },
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar
          className={cn(
            buttonVariants({
              size: "icon-sm",
              variant: "outline",
            }),
            "cursor-pointer",
          )}
        >
          <AvatarImage
            src={`https://api.dicebear.com/9.x/fun-emoji/svg?seed=${ctx.user.name}`}
            alt={ctx.user.name}
          />
          <AvatarFallback>
            {ctx.user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="space-y-1">
            <p className="font-medium text-sm leading-none">{ctx.user.name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {ctx.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <UserPen />
            Account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={ctx.user.role === "SELLER" ? "/dashboard" : "/sell"}>
            {ctx.user.role === "SELLER" ? <LayoutDashboard /> : <Store />}
            {ctx.user.role === "SELLER" ? "Dashboard" : "Setup Your Store"}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={onSignOut}>
          <LogOut />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
