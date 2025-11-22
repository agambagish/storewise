import { CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  noDescription?: boolean;
}

export function CardHeaderSkeleton({ noDescription }: Props) {
  return (
    <CardHeader>
      <Skeleton className="h-4 w-32" />
      {!noDescription && <Skeleton className="h-5 w-64" />}
    </CardHeader>
  );
}
