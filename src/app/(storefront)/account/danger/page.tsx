import { AlertTriangle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function () {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-semibold text-foreground text-xl">Danger zone</h2>
        <p className="mt-1 text-muted-foreground text-sm">
          Irreversible and destructive actions.
        </p>
      </div>
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
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
