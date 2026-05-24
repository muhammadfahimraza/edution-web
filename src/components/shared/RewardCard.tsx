import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { AppIcon } from '@/components/ui/AppIcon';
import type { IconName } from '@/lib/icons';
import { PointsBadge } from './PointsBadge';

export type RewardCardProps = {
  id: string;
  name: string;
  icon: IconName;
  category: string;
  pointsCost: number;
  stock: number;
  active: boolean;
  onToggleActive?: (id: string) => void;
  className?: string;
};

function categoryVariant(cat: string) {
  if (cat === 'physical') return 'primary' as const;
  if (cat === 'digital') return 'accent' as const;
  return 'neutral' as const;
}

export function RewardCard({
  id,
  name,
  icon,
  category,
  pointsCost,
  stock,
  active,
  onToggleActive,
  className,
}: RewardCardProps) {
  return (
    <article
      className={cn(
        'flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4',
        !active && 'opacity-60',
        className,
      )}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex size-10 items-center justify-center rounded-lg bg-[var(--color-primary-light)]">
          <AppIcon name={icon} size={22} className="text-[var(--color-primary)]" />
        </div>
        <Badge label={category} variant={categoryVariant(category)} />
      </div>
      <h3 className="mt-2 font-semibold">{name}</h3>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <PointsBadge points={pointsCost} />
        <span className="text-xs text-[var(--color-text-secondary)]">
          Stock: {stock === 999 ? '∞' : stock}
        </span>
      </div>
      {onToggleActive ? (
        <button
          type="button"
          className="mt-3 text-left text-sm font-medium text-[var(--color-primary)] hover:underline"
          onClick={() => onToggleActive(id)}>
          {active ? 'Deactivate' : 'Activate'}
        </button>
      ) : null}
    </article>
  );
}

function div({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}
