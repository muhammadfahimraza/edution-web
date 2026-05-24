'use client';

import { useMemo, useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { SideDrawer } from '@/components/admin/SideDrawer';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { mockChatAuditFlags } from '@/mocks/principal.mock';

export function PrincipalChatAuditScreen() {
  const [flags, setFlags] = useState(mockChatAuditFlags);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [tab, setTab] = useState<'pending' | 'all'>('pending');

  const filtered = useMemo(() => {
    if (tab === 'all') return flags;
    return flags.filter(f => f.status === 'pending');
  }, [flags, tab]);

  const selected = flags.find(f => f.id === selectedId);

  const markReviewed = () => {
    if (!selected) return;
    setFlags(prev => prev.map(f => (f.id === selected.id ? { ...f, status: 'reviewed' as const } : f)));
    setSelectedId(null);
  };

  return (
    <>
      <AdminPageHeader title="Chat audit" subtitle="Flagged messages for principal review" />

      <div className="mb-4 flex gap-2">
        {(['pending', 'all'] as const).map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={
              tab === t
                ? 'rounded-full bg-[var(--color-primary)] px-4 py-1.5 text-sm font-semibold text-white'
                : 'rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-sm font-medium text-[var(--color-text-secondary)]'
            }>
            {t === 'pending' ? 'Pending' : 'All'}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={filtered}
          keyExtractor={row => row.id}
          emptyMessage="No flagged messages."
          columns={[
            {
              key: 'excerpt',
              header: 'Message',
              render: row => (
                <button type="button" className="text-left font-medium text-[var(--color-primary)] hover:underline" onClick={() => setSelectedId(row.id)}>
                  {row.excerpt}
                </button>
              ),
            },
            { key: 'channel', header: 'Channel', render: row => row.channel },
            { key: 'sender', header: 'Sender', render: row => row.sender },
            { key: 'reason', header: 'Reason', render: row => <Badge label={row.reason} variant="error" /> },
            { key: 'status', header: 'Status', render: row => <Badge label={row.status.replace('_', ' ')} variant={row.status === 'pending' ? 'warning' : 'neutral'} /> },
          ]}
        />
      </div>

      <SideDrawer
        open={!!selected}
        onClose={() => setSelectedId(null)}
        title="Flagged message"
        subtitle={selected?.channel}
        footer={
          selected?.status === 'pending' ? (
            <div className="flex gap-2">
              <Button label="Dismiss" variant="outline" fullWidth onClick={() => setSelectedId(null)} />
              <Button label="Mark reviewed" fullWidth onClick={markReviewed} />
            </div>
          ) : undefined
        }>
        {selected ? (
          <dl className="flex flex-col gap-3 text-sm">
            <div><dt className="text-[var(--color-text-secondary)]">Sender</dt><dd>{selected.sender}</dd></div>
            <div><dt className="text-[var(--color-text-secondary)]">Excerpt</dt><dd className="mt-1 rounded-lg bg-[var(--color-background)] p-3">{selected.excerpt}</dd></div>
            <div><dt className="text-[var(--color-text-secondary)]">Flagged</dt><dd>{selected.flaggedAt}</dd></div>
          </dl>
        ) : null}
      </SideDrawer>
    </>
  );
}
