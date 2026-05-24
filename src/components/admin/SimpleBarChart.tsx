import { cn } from '@/lib/utils';
import type { SchoolsChartPoint } from '@/mocks/adminPlatform.mock';

export type SimpleBarChartProps = {
  data: SchoolsChartPoint[];
  className?: string;
};

export function SimpleBarChart({ data, className }: SimpleBarChartProps) {
  const max = Math.max(...data.map(d => d.schools), 1);

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex h-48 items-end justify-between gap-2 px-2">
        {data.map(point => {
          const heightPct = (point.schools / max) * 100;
          return (
            <div key={point.month} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs font-medium text-[var(--color-primary-dark)]">
                {point.schools}
              </span>
              <div
                className="w-full max-w-10 rounded-t-md bg-[var(--color-primary)] transition-all"
                style={{ height: `${Math.max(heightPct, 8)}%` }}
                title={`${point.month}: ${point.schools} schools`}
              />
              <span className="text-xs text-[var(--color-text-secondary)]">{point.month}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
