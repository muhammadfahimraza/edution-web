import { cn } from '@/lib/utils';

export type SkeletonProps = {
  className?: string;
  lines?: number;
};

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse rounded-lg bg-[var(--color-border)]/60', className)}
      aria-hidden
    />
  );
}

export function SkeletonLines({ lines = 3, className }: SkeletonProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)} aria-busy aria-label="Loading">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={cn('h-4', i === lines - 1 ? 'w-2/3' : 'w-full')} />
      ))}
    </div>
  );
}

export function SkeletonTableRows({ rows = 5, className }: { rows?: number; className?: string }) {
  return (
    <div className={cn('flex flex-col gap-3', className)} aria-busy aria-label="Loading">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full rounded-xl" />
      ))}
    </div>
  );
}
