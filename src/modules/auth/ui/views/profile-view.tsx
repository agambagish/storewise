"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { isDefinedError } from "@orpc/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { orpc } from "@/orpc/client";

import { ChangeNameCard } from "../components/change-name-card";
import { ChangePasswordCard } from "../components/change-password-card";
import { ProfileViewSkeleton } from "../components/profile-view-skeleton";
import { ResendVerificationAlert } from "../components/resend-verification-alert";

export function ProfileView() {
  const router = useRouter();
  const { data, isLoading, error } = useQuery(
    orpc.auth.me.queryOptions({
      retry: false,
    }),
  );

  useEffect(() => {
    if (isDefinedError(error) && error.code === "UNAUTHORIZED") {
      toast.error(error.message);
      router.push("/sign-in");
    }
  }, [error, router]);

  if (isLoading) {
    return <ProfileViewSkeleton />;
  }

  if (isDefinedError(error) && error.code === "UNAUTHORIZED") {
    return null;
  }

  const user = data!;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="space-y-6 md:col-span-1">
        <Card>
          <CardContent>
            <div className="flex flex-col items-center space-y-4 text-center">
              <Avatar className="size-24">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${user.name}`}
                  alt={user.name}
                />
                <AvatarFallback className="text-2xl">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="w-full space-y-1">
                <h2 className="font-semibold text-xl">{user.name}</h2>
                <p className="text-muted-foreground text-sm">{user.email}</p>
                <Badge
                  className={cn("m-2 h-6 capitalize", {
                    "border-red-400 bg-red-200 text-red-700":
                      !user.emailVerified,
                  })}
                >
                  {!user.emailVerified ? "Not Verified" : user.role}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        {!user.emailVerified && <ResendVerificationAlert email={user.email} />}
      </div>
      <div className="space-y-6 md:col-span-2">
        <ChangeNameCard name={user.name} />
        <ChangePasswordCard />
      </div>
    </div>
  );
}
