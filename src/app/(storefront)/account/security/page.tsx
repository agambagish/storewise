import { Suspense } from "react";

import { CardHeaderSkeleton } from "@/components/skeletons/card-header-skeleton";
import { FormFieldSkeleton } from "@/components/skeletons/form-field-skeleton";
import { SessionCardSkeleton } from "@/components/skeletons/session-card-skeleton";
import { Card, CardContent } from "@/components/ui/card";
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
      <Suspense fallback={<ResolvedSectionSkeleton />}>
        <ResolvedSection />
      </Suspense>
    </div>
  );
}

async function ResolvedSection() {
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

function ResolvedSectionSkeleton() {
  return (
    <>
      <Card>
        <CardHeaderSkeleton />
        <CardContent>
          <div className="flex flex-col gap-7">
            <FormFieldSkeleton />
            <div className="flex gap-7">
              <FormFieldSkeleton className="w-full" />
              <FormFieldSkeleton className="w-full" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="size-4 shrink-0 rounded-lg" />
              <Skeleton className="h-3.5 w-52" />
            </div>
            <Skeleton className="h-9 w-full" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeaderSkeleton />
        <CardContent className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <SessionCardSkeleton />
          <SessionCardSkeleton />
        </CardContent>
      </Card>
    </>
  );
}
