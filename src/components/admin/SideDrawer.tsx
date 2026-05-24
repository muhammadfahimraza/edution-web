'use client';

import { ReactNode, useEffect } from 'react';
import { cn } from '@/lib/utils';

export type SideDrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: 'md' | 'lg';
};

export function SideDrawer({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width = 'md',
}: SideDrawerProps) {
  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label="Close drawer"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        className={cn(
          'relative flex h-full flex-col bg-white shadow-xl',
          width === 'lg' ? 'w-full max-w-lg' : 'w-full max-w-md',
        )}>
        <header className="flex items-start justify-between gap-4 border-b border-[var(--color-border)] px-5 py-4">
          <div>
            <h2 id="drawer-title" className="text-lg font-bold text-[var(--color-text)]">
              {title}
            </h2>
            {subtitle ? (
              <p className="mt-0.5 text-sm text-[var(--color-text-secondary)]">{subtitle}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-xl text-[var(--color-text-secondary)] hover:bg-[var(--color-background)]"
            aria-label="Close">
            ×
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
        {footer ? (
          <footer className="border-t border-[var(--color-border)] px-5 py-4">{footer}</footer>
        ) : null}
      </aside>
    </div>
  );
}
