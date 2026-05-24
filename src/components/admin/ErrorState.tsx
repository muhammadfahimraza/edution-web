import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';

export type ErrorStateProps = {
  title: string;
  description?: string;
  onRetry?: () => void;
  action?: ReactNode;
  className?: string;
};

export function ErrorState({ title, description, onRetry, action, className }: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-[var(--color-error)]/30 bg-[var(--color-error)]/5 px-6 py-12 text-center',
        className,
      )}
      role="alert">
      <p className="text-lg font-semibold text-[var(--color-error)]">{title}</p>
      {description ? (
        <p className="mt-2 max-w-sm text-sm text-[var(--color-text-secondary)]">{description}</p>
      ) : null}
      {onRetry ? (
        <div className="mt-4">
          <Button label="Try again" size="sm" variant="outline" onClick={onRetry} />
        </div>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
