import { cn } from '@/lib/utils';
import { PointsBadge } from './PointsBadge';

export type LeaderboardRowProps = {
  rank: number;
  name: string;
  subtitle?: string;
  points: number;
  change?: number;
  highlight?: boolean;
  className?: string;
};

export function LeaderboardRow({
  rank,
  name,
  subtitle,
  points,
  change,
  highlight,
  className,
}: LeaderboardRowProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3',
        highlight && 'border-[var(--color-primary)]/40 bg-[var(--color-primary-light)]/30',
        className,
      )}>
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-background)] text-sm font-bold">
        {rank}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{name}</p>
        {subtitle ? <p className="truncate text-xs text-[var(--color-text-secondary)]">{subtitle}</p> : null}
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <PointsBadge points={points} />
        {change !== undefined ? (
          <span
            className={cn(
              'text-xs font-medium',
              change >= 0 ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]',
            )}>
            {change >= 0 ? '+' : ''}
            {change}
          </span>
        ) : null}
      </div>
    </div>
  );
}
