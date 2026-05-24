import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  padded?: boolean;
};

export function Card({ padded = true, className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]',
        padded && 'p-4',
        className,
      )}
      {...rest}>
      {children}
    </div>
  );
}
