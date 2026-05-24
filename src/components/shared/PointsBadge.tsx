import { cn } from '@/lib/utils';

export type PointsBadgeProps = {
  points: number;
  label?: string;
  className?: string;
};

export function PointsBadge({ points, label, className }: PointsBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full bg-[var(--color-accent)]/15 px-2.5 py-0.5 text-xs font-semibold text-[var(--color-accent)]',
        className,
      )}>
      {label ? <span className="font-normal text-[var(--color-text-secondary)]">{label}</span> : null}
      {points.toLocaleString()} pts
    </span>
  );
}
