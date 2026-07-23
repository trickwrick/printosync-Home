import { Container } from "@/shared/ui/container";
import { Skeleton } from "@/shared/ui/skeleton";

export function PageLoadingSkeleton() {
  return (
    <Container className="py-24">
      <div className="flex flex-col items-center gap-6">
        <div className="size-10 animate-pulse rounded-xl bg-brand/20" />
        <div className="h-1 w-24 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-full animate-[loader-bar_1s_ease-in-out_infinite] bg-brand" />
        </div>
        <div className="w-full max-w-2xl space-y-4">
          <Skeleton className="mx-auto h-10 w-3/4" />
          <Skeleton className="mx-auto h-4 w-full" />
          <Skeleton className="mx-auto h-4 w-5/6" />
        </div>
      </div>
    </Container>
  );
}

export function CardGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-4 rounded-xl border border-border p-6">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      ))}
    </div>
  );
}
