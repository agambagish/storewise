import { Suspense } from "react";

import { AlertTriangle } from "lucide-react";

import { CardHeaderSkeleton } from "@/components/skeletons/card-header-skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { assertSuccess } from "@/lib/data-access/helpers";
import { DeleteAccountDialog } from "@/modules/auth/components/dialogs/delete-account-dialog";
import { getUser } from "@/modules/auth/server/queries";

export default function () {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-semibold text-foreground text-xl">Danger zone</h2>
        <p className="mt-1 text-muted-foreground text-sm">
          Irreversible and destructive actions.
        </p>
      </div>
      <Suspense fallback={<ResolvedSectionSkeleton />}>
        <ResolvedSection />
      </Suspense>
    </div>
  );
}

async function ResolvedSection() {
  const result = await getUser();
  assertSuccess(result);

  return (
    <Card className="border-destructive/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="size-4 text-destructive" />
          Delete account
        </CardTitle>
        <CardDescription>
          Once you delete your account, there is no going back. Please be
          certain.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DeleteAccountDialog />
      </CardContent>
    </Card>
  );
}

export function ResolvedSectionSkeleton() {
  return (
    <Card className="border-destructive/50">
      <CardHeaderSkeleton />
      <CardContent>
        <Skeleton className="h-9 w-[155px]" />
      </CardContent>
    </Card>
  );
}
