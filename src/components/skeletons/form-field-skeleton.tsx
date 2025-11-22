import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export function FormFieldSkeleton({ className }: Props) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-9 w-full" />
    </div>
  );
}
