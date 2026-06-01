// Skeleton placeholders — reserve space for async content so the layout
// doesn't jump on load (design: content-jumping / loading-states).

export function SkeletonLine({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-ink-600/50 ${className}`} />;
}

export function SkeletonCard() {
  return (
    <div className="card space-y-3 p-5">
      <SkeletonLine className="h-4 w-24" />
      <SkeletonLine className="h-8 w-32" />
      <SkeletonLine className="h-3 w-40" />
    </div>
  );
}

export function SkeletonTile() {
  return (
    <div className="card space-y-4 p-5">
      <div className="flex items-center justify-between">
        <SkeletonLine className="h-9 w-9 rounded-xl" />
        <SkeletonLine className="h-6 w-20 rounded-full" />
      </div>
      <SkeletonLine className="h-5 w-40" />
      <SkeletonLine className="h-3 w-32" />
      <SkeletonLine className="h-9 w-full rounded-xl" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="card flex items-center justify-between gap-4 p-5">
      <div className="flex-1 space-y-2">
        <SkeletonLine className="h-4 w-32" />
        <SkeletonLine className="h-3 w-48" />
      </div>
      <SkeletonLine className="h-6 w-24 rounded-full" />
    </div>
  );
}
