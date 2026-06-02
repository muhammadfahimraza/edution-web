'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { AppIcon } from '@/components/ui/AppIcon';
import { mockNotifications } from '@/mocks/sharedK.mock';

export type NotificationsDropdownProps = {
  slug: string;
  className?: string;
};

/** K3 — Notifications dropdown (header) */
export function NotificationsDropdown({ slug, className }: NotificationsDropdownProps) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(mockNotifications);
  const ref = useRef<HTMLDivElement>(null);

  const unread = items.filter(n => !n.read).length;

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const markRead = (id: string) => {
    setItems(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllRead = () => {
    setItems(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        aria-label={`Notifications${unread ? `, ${unread} unread` : ''}`}
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        className="relative flex size-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-white hover:bg-[var(--color-background)]">
        <AppIcon name="bell" size={18} className="text-[var(--color-text-secondary)]" />
        {unread > 0 ? (
          <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-[var(--color-error)] text-[10px] font-bold text-white">
            {unread}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 z-50 mt-2 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-xl border border-[var(--color-border)] bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
            <p className="text-sm font-semibold">Notifications</p>
            {unread > 0 ? (
              <button type="button" onClick={markAllRead} className="text-xs font-medium text-[var(--color-primary)] hover:underline">
                Mark all read
              </button>
            ) : null}
          </div>
          <ul className="max-h-72 overflow-y-auto">
            {items.slice(0, 5).map(n => (
              <li key={n.id} className={cn('border-b border-[var(--color-border)] last:border-0', !n.read && 'bg-[var(--color-primary-light)]/20')}>
                <Link
                  href={n.href ? `/s/${slug}${n.href}` : `/s/${slug}/notifications`}
                  onClick={() => {
                    markRead(n.id);
                    setOpen(false);
                  }}
                  className="block px-4 py-3 text-sm hover:bg-[var(--color-background)]">
                  <p className="font-medium text-[var(--color-text)]">{n.title}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{n.body}</p>
                  <p className="mt-1 text-[10px] text-[var(--color-text-secondary)]">{n.time}</p>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={`/s/${slug}/notifications`}
            onClick={() => setOpen(false)}
            className="block border-t border-[var(--color-border)] px-4 py-2.5 text-center text-xs font-semibold text-[var(--color-primary)] hover:bg-[var(--color-background)]">
            View all notifications
          </Link>
        </div>
      ) : null}
    </div>
  );
}
