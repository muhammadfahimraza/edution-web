'use client';

import { useMemo, useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { ReportLayout } from '@/components/analytics/ReportLayout';
import {
  getLeaderboardByScope,
  type PrincipalLeaderboardScope,
} from '@/mocks/principalInsights.mock';
import { cn } from '@/lib/utils';

const SCOPES: { id: PrincipalLeaderboardScope; label: string }[] = [
  { id: 'class', label: 'Class' },
  { id: 'grade', label: 'Grade' },
  { id: 'school', label: 'School' },
];

export function PrincipalLeaderboardsScreen({ slug: _slug }: { slug: string }) {
  const [scope, setScope] = useState<PrincipalLeaderboardScope>('school');
  const rows = useMemo(() => getLeaderboardByScope(scope), [scope]);

  return (
    <ReportLayout
      title="Leaderboards"
      subtitle="Student and grade rankings for the current term"
      kpis={[
        { label: 'Students ranked', value: String(rows.length), trend: 'neutral' },
        { label: 'Top score', value: String(rows[0]?.points ?? 0), trend: 'up' },
        { label: 'Scope', value: scope, trend: 'neutral' },
        { label: 'Term', value: '2026 Spring', trend: 'neutral' },
      ]}
    >
      <div className="mb-4 flex gap-2">
        {SCOPES.map(s => (
          <button
            key={s.id}
            type="button"
            onClick={() => setScope(s.id)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              scope === s.id
                ? 'bg-[var(--color-primary)] text-white'
                : 'border border-[var(--color-border)] bg-white text-[var(--color-text-secondary)]',
            )}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={rows}
          keyExtractor={row => `${scope}-${row.rank}`}
          emptyMessage="No rankings."
          columns={[
            { key: 'rank', header: '#', render: row => row.rank },
            { key: 'name', header: scope === 'grade' ? 'Grade' : 'Student', render: row => <span className="font-medium">{row.name}</span> },
            { key: 'class', header: 'Class', render: row => row.classSection },
            { key: 'points', header: 'Points', render: row => row.points },
            {
              key: 'change',
              header: 'Change',
              render: row => (
                <span className={row.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                  {row.change >= 0 ? '+' : ''}
                  {row.change}
                </span>
              ),
            },
          ]}
        />
      </div>
    </ReportLayout>
  );
}
