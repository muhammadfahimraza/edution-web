'use client';

import { cn } from '@/lib/utils';
import { AppIcon } from '@/components/ui/AppIcon';
import type { IconName } from '@/lib/icons';
import type { SyncState } from '@/mocks/field.mock';

export type SyncStatusBannerProps = {
  state: SyncState;
  pendingCount?: number;
  onRetry?: () => void;
  className?: string;
};

const config: Record<
  SyncState,
  { label: string; className: string; showRetry: boolean; icon: IconName | 'spinner' }
> = {
  synced: {
    label: 'All changes synced',
    className: 'bg-[var(--color-success)]/15 text-[var(--color-success)]',
    showRetry: false,
    icon: 'check',
  },
  syncing: {
    label: 'Syncing…',
    className: 'bg-[var(--color-primary-light)] text-[var(--color-primary-dark)]',
    showRetry: false,
    icon: 'spinner',
  },
  offline: {
    label: 'Offline — changes saved locally',
    className: 'bg-[var(--color-warning)]/20 text-[var(--color-text)]',
    showRetry: true,
    icon: 'wifiOff',
  },
  pending: {
    label: 'Pending upload',
    className: 'bg-[var(--color-warning)]/20 text-[var(--color-text)]',
    showRetry: true,
    icon: 'upload',
  },
};

/** J7 — Sync status banner (mock offline/synced) */
export function SyncStatusBanner({
  state,
  pendingCount = 0,
  onRetry,
  className,
}: SyncStatusBannerProps) {
  const c = config[state];
  const label =
    state === 'pending' && pendingCount > 0
      ? `${pendingCount} item${pendingCount === 1 ? '' : 's'} pending upload`
      : c.label;

  return (
    <div
      role="status"
      className={cn(
        'flex items-center justify-between gap-2 px-4 py-2 text-sm font-medium',
        c.className,
        className,
      )}>
      <span className="flex items-center gap-2">
        {c.icon === 'spinner' ? (
          <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <AppIcon name={c.icon} size={16} aria-hidden />
        )}
        {label}
      </span>
      {c.showRetry && onRetry ? (
        <button type="button" onClick={onRetry} className="text-xs font-semibold underline">
          Retry sync
        </button>
      ) : null}
    </div>
  );
}
