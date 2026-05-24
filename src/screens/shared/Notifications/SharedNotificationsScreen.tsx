'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import { mockNotifications } from '@/mocks/sharedK.mock';
import { cn } from '@/lib/utils';

/** K3 — Notifications full page */
export function SharedNotificationsScreen({ slug }: { slug: string }) {
  const [items, setItems] = useState(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = filter === 'unread' ? items.filter(n => !n.read) : items;

  const markAllRead = () => setItems(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <>
      <AdminPageHeader
        title="Notifications"
        subtitle="All alerts for your school"
        actions={<Button label="Mark all read" size="sm" variant="outline" onClick={markAllRead} />}
      />

      <div className="mb-4 flex gap-2">
        {(['all', 'unread'] as const).map(f => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={
              filter === f
                ? 'rounded-full bg-[var(--color-primary)] px-4 py-1.5 text-sm font-semibold text-white'
                : 'rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-sm font-medium text-[var(--color-text-secondary)]'
            }>
            {f === 'all' ? 'All' : 'Unread'}
          </button>
        ))}
      </div>

      <ul className="flex flex-col gap-2">
        {filtered.map(n => (
          <li
            key={n.id}
            className={cn(
              'rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4',
              !n.read && 'border-[var(--color-primary)]/40 bg-[var(--color-primary-light)]/20',
            )}>
            <Link
              href={n.href ? `/s/${slug}${n.href}` : '#'}
              className="block"
              onClick={() => setItems(prev => prev.map(x => (x.id === n.id ? { ...x, read: true } : x)))}>
              <p className="font-semibold">{n.title}</p>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{n.body}</p>
              <p className="mt-2 text-xs text-[var(--color-text-secondary)]">{n.time}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
