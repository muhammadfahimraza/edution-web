import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function ChartCard({
  title,
  subtitle,
  children,
  className,
  toolbar,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  toolbar?: ReactNode;
}) {
  return (
    <section
      className={cn(
        'rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5',
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-[var(--color-text)]">{title}</h2>
          {subtitle ? (
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{subtitle}</p>
          ) : null}
        </div>
        {toolbar}
      </div>
      <div className="mt-4">{children}</div>
    </section>
  );
}
