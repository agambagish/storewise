import { Suspense } from "react";

import { assertSuccess } from "@/lib/data-access/helpers";
import { EditNameDialog } from "@/modules/auth/components/dialogs/edit-name-dialog";
import { getUser } from "@/modules/auth/server/queries";

export default function () {
  return (
    <div className="space-y-8">
      <h2 className="font-semibold text-foreground text-xl">Profile Details</h2>
      <div className="space-y-6">
        <Suspense fallback={<ResolvedProfileSkeleton />}>
          <ResolvedProfile />
        </Suspense>
      </div>
    </div>
  );
}

async function ResolvedProfile() {
  const result = await getUser();
  const user = assertSuccess(result);

  return (
    <>
      <ProfileFieldRow label="Name">
        <span className="text-foreground text-sm">{user.name}</span>
        <EditNameDialog name={user.name} />
      </ProfileFieldRow>
      <ProfileFieldRow label="Email">
        <span className="text-foreground text-sm">{user.email}</span>
      </ProfileFieldRow>
    </>
  );
}

function ProfileFieldRow({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 border-border border-b py-4">
      <div className="min-w-32 font-medium text-muted-foreground text-sm">
        {label}
      </div>
      <div className="flex h-7 items-center gap-2 font-medium text-foreground text-sm">
        {children}
      </div>
    </div>
  );
}

function ResolvedProfileSkeleton() {
  return (
    <>
      <ProfileFieldRow
        label={<div className="h-7 w-24 animate-pulse rounded-md bg-accent" />}
      >
        <div className="h-7 w-60 animate-pulse rounded-md bg-accent" />
      </ProfileFieldRow>
      <ProfileFieldRow
        label={<div className="h-7 w-24 animate-pulse rounded-md bg-accent" />}
      >
        <div className="h-7 w-60 animate-pulse rounded-md bg-accent" />
      </ProfileFieldRow>
    </>
  );
}
