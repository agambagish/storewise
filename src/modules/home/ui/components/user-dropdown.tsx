import { Suspense, use } from "react";
import Link from "next/link";

import type { User } from "better-auth";
import { LayoutDashboard, LogOut, Store, UserPen } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { client } from "@/orpc/client";

interface Props {
  user: User;
  onLogout: () => void;
}

export function UserDropdown({ user, onLogout }: Props) {
  const storePromise = client.stores.getOne();

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Avatar className="size-5">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${user.name}`}
                  alt={user.name}
                />
                <AvatarFallback>
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>{user.name}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="space-y-1">
            <p className="font-medium text-sm leading-none">{user.name}</p>
            <p className="text-muted-foreground text-xs leading-none">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <UserPen />
            Profile
          </Link>
        </DropdownMenuItem>
        <Suspense fallback={<Skeleton className="h-8 w-full rounded-sm" />}>
          <StoreDropdownMenuItem storePromise={storePromise} />
        </Suspense>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={onLogout}>
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface StoreDropdownMenuItemProps {
  storePromise: ReturnType<typeof client.stores.getOne>;
}

function StoreDropdownMenuItem({ storePromise }: StoreDropdownMenuItemProps) {
  const store = use(storePromise);

  return (
    <DropdownMenuItem asChild>
      {!store ? (
        <Link href="/sell">
          <Store />
          Setup your store
        </Link>
      ) : (
        <Link href="/dashboard">
          <LayoutDashboard />
          Dashboard
        </Link>
      )}
    </DropdownMenuItem>
  );
}
