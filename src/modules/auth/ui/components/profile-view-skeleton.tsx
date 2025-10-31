import { Alert } from "@/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileViewSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="space-y-6 md:col-span-1">
        <Card>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <Skeleton className="size-24 rounded-full" />
              <div className="flex flex-col items-center space-y-1">
                <Skeleton className="h-7 w-32" />
                <Skeleton className="h-5 w-52" />
                <Skeleton className="m-2 h-6 w-16" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Alert>
          <Skeleton className="h-5 w-48" />
        </Alert>
      </div>
      <div className="space-y-6 md:col-span-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-9 w-22" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-5 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-9 w-full" />
              </div>
              <Skeleton className="h-9 w-22" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
