import { cn } from '@/lib/utils';

export type SpinnerProps = {
  label?: string;
  className?: string;
};

export function Spinner({ label, className }: SpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center gap-2 p-6', className)}>
      <span
        className="size-10 animate-spin rounded-full border-[3px] border-[var(--color-primary)] border-t-transparent"
        role="status"
        aria-label={label ?? 'Loading'}
      />
      {label ? (
        <p className="text-sm text-[var(--color-text-secondary)]">{label}</p>
      ) : null}
    </div>
  );
}
