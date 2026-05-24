import { cn } from '@/lib/utils';

export type StatCardProps = {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
};

const trendColors = {
  up: 'text-[var(--color-success)]',
  down: 'text-[var(--color-error)]',
  neutral: 'text-[var(--color-text-secondary)]',
};

export function StatCard({ label, value, change, trend = 'neutral', className }: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4',
        className,
      )}>
      <p className="text-sm text-[var(--color-text-secondary)]">{label}</p>
      <p className="mt-1 text-2xl font-bold text-[var(--color-text)]">{value}</p>
      {change ? (
        <p className={cn('mt-1 text-xs font-medium', trendColors[trend])}>{change}</p>
      ) : null}
    </div>
  );
}
