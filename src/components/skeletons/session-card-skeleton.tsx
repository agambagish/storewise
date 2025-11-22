import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SessionCardSkeleton() {
  return (
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
  );
}
