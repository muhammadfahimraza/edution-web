'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { mockPrincipalTickets } from '@/mocks/principal.mock';

function statusVariant(s: string) {
  if (s === 'escalated') return 'error' as const;
  if (s === 'resolved') return 'success' as const;
  if (s === 'in_progress') return 'accent' as const;
  return 'warning' as const;
}

export function PrincipalTicketsScreen() {
  const params = useParams();
  const slug = typeof params.slug === 'string' ? params.slug : 'green-valley';
  const [tab, setTab] = useState<'open' | 'all'>('open');

  const filtered = useMemo(() => {
    if (tab === 'all') return mockPrincipalTickets;
    return mockPrincipalTickets.filter(t => t.status !== 'resolved');
  }, [tab]);

  return (
    <>
      <AdminPageHeader title="Tickets overview" subtitle="Parent and staff support requests" />

      <div className="mb-4 flex gap-2">
        {(['open', 'all'] as const).map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={
              tab === t
                ? 'rounded-full bg-[var(--color-primary)] px-4 py-1.5 text-sm font-semibold text-white'
                : 'rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-sm font-medium text-[var(--color-text-secondary)]'
            }>
            {t === 'open' ? 'Open' : 'All'}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={filtered}
          keyExtractor={row => row.id}
          emptyMessage="No tickets."
          columns={[
            { key: 'subject', header: 'Subject', render: row => <span className="font-medium">{row.subject}</span> },
            { key: 'cat', header: 'Category', render: row => row.category },
            { key: 'req', header: 'Requester', render: row => row.requester },
            { key: 'age', header: 'Age', render: row => `${row.ageDays}d` },
            { key: 'priority', header: 'Priority', render: row => <Badge label={row.priority} variant={row.priority === 'high' ? 'error' : 'neutral'} /> },
            { key: 'status', header: 'Status', render: row => <Badge label={row.status.replace('_', ' ')} variant={statusVariant(row.status)} /> },
            {
              key: 'actions',
              header: '',
              render: row => (
                <Link
                  href={`/s/${slug}/tickets/${row.id}?from=principal`}
                  className="text-sm text-[var(--color-primary)] hover:underline">
                  Open
                </Link>
              ),
            },
          ]}
        />
      </div>
    </>
  );
}
