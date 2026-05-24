import { cn } from '@/lib/utils';
import { InputHTMLAttributes } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
};

export function Input({ label, error, hint, className, id, ...rest }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="flex flex-col gap-1">
      {label ? (
        <label htmlFor={inputId} className="text-sm font-medium text-[var(--color-text)]">
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className={cn(
          'min-h-12 w-full rounded-lg border bg-white px-4 py-2 text-base text-[var(--color-text)]',
          'placeholder:text-[var(--color-text-secondary)]',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--color-primary)]',
          error
            ? 'border-[var(--color-error)]'
            : 'border-[var(--color-border)]',
          className,
        )}
        {...rest}
      />
      {error ? (
        <p className="text-xs text-[var(--color-error)]">{error}</p>
      ) : hint ? (
        <p className="text-xs text-[var(--color-text-secondary)]">{hint}</p>
      ) : null}
    </div>
  );
}
