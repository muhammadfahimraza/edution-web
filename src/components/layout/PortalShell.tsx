'use client';

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AppIcon } from '@/components/ui/AppIcon';
import { cn } from '@/lib/utils';

export type PortalShellProps = {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

export function PortalShell({ sidebar, header, children, className, style }: PortalShellProps) {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, []);

  useEffect(() => {
    if (!navOpen) {
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setNavOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
    };
  }, [navOpen]);

  return (
    <div
      className={cn(
        'fixed inset-0 flex h-dvh max-h-dvh w-full overflow-hidden bg-[var(--color-background)]',
        className,
      )}
      style={style}>
      <div className="hidden h-full min-h-0 w-64 shrink-0 xl:flex">{sidebar}</div>

      {navOpen ? (
        <div className="fixed inset-0 z-50 xl:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close menu"
            onClick={() => setNavOpen(false)}
          />
          <div
            className="relative flex h-full w-[min(16rem,85vw)] shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation">
            {sidebar}
          </div>
        </div>
      ) : null}

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="flex shrink-0">
          <button
            type="button"
            className="flex h-14 w-12 shrink-0 items-center justify-center border-b border-[var(--color-border)] bg-white text-[var(--color-text)] xl:hidden"
            aria-label="Open menu"
            aria-expanded={navOpen}
            onClick={() => setNavOpen(true)}>
            <AppIcon name="menu" size={22} />
          </button>
          <div className="min-w-0 flex-1">{header}</div>
        </div>
        <main className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain p-4 sm:p-6 [-webkit-overflow-scrolling:touch]">
          {children}
        </main>
      </div>
    </div>
  );
}
