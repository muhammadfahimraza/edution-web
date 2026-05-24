'use client';

import { DataTable } from '@/components/admin/DataTable';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { mockEscalatedTickets } from '@/mocks/adminF10F17.mock';

function priorityVariant(p: 'high' | 'medium' | 'low') {
  if (p === 'high') return 'error' as const;
  if (p === 'medium') return 'warning' as const;
  return 'neutral' as const;
}

function statusVariant(s: 'open' | 'in_progress' | 'escalated') {
  if (s === 'escalated') return 'error' as const;
  if (s === 'in_progress') return 'accent' as const;
  return 'warning' as const;
}

/** F14 — Escalated tickets L2 queue */
export function AdminEscalatedTicketsScreen() {
  return (
    <>
      <AdminPageHeader
        title="Escalated tickets"
        subtitle="L2 support queue — full list"
      />

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={mockEscalatedTickets}
          keyExtractor={row => row.id}
          emptyMessage="No tickets in queue."
          columns={[
            { key: 'school', header: 'School', render: row => <span className="font-medium">{row.schoolName}</span> },
            { key: 'subject', header: 'Subject', render: row => row.subject },
            { key: 'cat', header: 'Category', render: row => row.category },
            { key: 'priority', header: 'Priority', render: row => <Badge label={row.priority} variant={priorityVariant(row.priority)} /> },
            {
              key: 'age',
              header: 'Age',
              render: row => (
                <span className={row.ageHours >= 48 ? 'font-semibold text-[var(--color-error)]' : ''}>{row.ageHours}h</span>
              ),
            },
            { key: 'assignee', header: 'Assignee', render: row => row.assignee ?? 'Unassigned' },
            { key: 'status', header: 'Status', render: row => <Badge label={row.status.replace('_', ' ')} variant={statusVariant(row.status)} /> },
            {
              key: 'actions',
              header: '',
              render: row => (
                <button type="button" className="text-sm text-[var(--color-primary)] hover:underline" onClick={() => alert(`Open ticket ${row.id} — UI demo.`)}>
                  Open
                </button>
              ),
            },
          ]}
        />
      </div>
    </>
  );
}
