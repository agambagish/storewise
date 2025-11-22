import { Suspense } from "react";

import { AlertTriangle } from "lucide-react";

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
      <Suspense fallback={<ResolvedCardSkeleton />}>
        <ResolvedCard />
      </Suspense>
    </div>
  );
}

async function ResolvedCard() {
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

export function ResolvedCardSkeleton() {
  return (
    <Card className="border-destructive/50">
      <CardHeader>
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-5 w-64" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-9 w-[155px]" />
      </CardContent>
    </Card>
  );
}
