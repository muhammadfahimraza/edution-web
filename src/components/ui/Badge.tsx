import { cn } from '@/lib/utils';

type BadgeVariant = 'primary' | 'accent' | 'neutral' | 'success' | 'warning' | 'error';

export type BadgeProps = {
  label: string;
  variant?: BadgeVariant;
  className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-[var(--color-primary-light)] text-[var(--color-primary-dark)]',
  accent: 'bg-[#FEF3E8] text-[#B45309]',
  neutral: 'bg-[var(--color-background)] text-[var(--color-text-secondary)]',
  success: 'bg-[#DCFCE7] text-[var(--color-success)]',
  warning: 'bg-[#FEF3C7] text-[var(--color-warning)]',
  error: 'bg-[#FEE2E2] text-[var(--color-error)]',
};

export function Badge({ label, variant = 'primary', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2.5 py-1 text-xs font-semibold',
        variantClasses[variant],
        className,
      )}>
      {label}
    </span>
  );
}
