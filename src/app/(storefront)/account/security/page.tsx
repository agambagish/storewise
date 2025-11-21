import { Suspense } from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { assertSuccess } from "@/lib/data-access/helpers";
import { ActiveDevices } from "@/modules/auth/components/active-devices";
import { ChangePassword } from "@/modules/auth/components/change-password";
import { getSessions } from "@/modules/auth/server/queries";

export default function () {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-semibold text-foreground text-xl">Security</h2>
        <p className="mt-1 text-muted-foreground text-sm">
          Manage your password and email settings.
        </p>
      </div>
      <Suspense fallback={<ResolvedCardsSkeleton />}>
        <ResolvedCards />
      </Suspense>
    </div>
  );
}

async function ResolvedCards() {
  const result = await getSessions();
  const { currentSession, otherSessions } = assertSuccess(result);

  return (
    <>
      <ChangePassword />
      <ActiveDevices
        currentSession={currentSession}
        otherSessions={otherSessions}
      />
    </>
  );
}

function ResolvedCardsSkeleton() {
  return (
    <>
      <Card>
        <CardHeader>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-5 w-64" />
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-4">
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="flex gap-7">
              <div className="flex w-full flex-col gap-4">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="flex w-full flex-col gap-4">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-9 w-full" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="size-4 shrink-0 rounded-[4px]" />
              <Skeleton className="h-3.5 w-52" />
            </div>
            <Skeleton className="h-9 w-full" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-5 w-64" />
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="size-12 rounded-md" />
                <div className="space-y-1">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-52" />
                  <Skeleton className="h-5 w-52" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-4 w-32" />
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="size-12 rounded-md" />
                <div className="space-y-1">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-52" />
                  <Skeleton className="h-5 w-52" />
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </>
  );
}
