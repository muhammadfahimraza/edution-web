'use client';

import { useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import {
  leaderboardTerms,
  mockSchoolRankings,
  type LeaderboardTerm,
} from '@/mocks/adminF10F17.mock';

/** F13 — Platform leaderboards */
export function AdminLeaderboardsScreen() {
  const [term, setTerm] = useState<LeaderboardTerm>('2026-summer');
  const rows = mockSchoolRankings[term];

  return (
    <>
      <AdminPageHeader title="Platform leaderboards" subtitle="School rankings by term" />

      <div className="mb-4 flex flex-wrap gap-2">
        {leaderboardTerms.map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTerm(t.id)}
            className={
              term === t.id
                ? 'rounded-full bg-[var(--color-primary)] px-4 py-1.5 text-sm font-semibold text-white'
                : 'rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-sm font-medium text-[var(--color-text-secondary)]'
            }>
            {t.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={rows}
          keyExtractor={row => String(row.rank)}
          emptyMessage="No rankings."
          columns={[
            { key: 'rank', header: '#', render: row => <span className="font-bold">{row.rank}</span> },
            { key: 'school', header: 'School', render: row => row.schoolName },
            { key: 'avg', header: 'Avg points', render: row => row.avgPoints.toLocaleString() },
            { key: 'active', header: 'Active students', render: row => row.activeStudents.toLocaleString() },
            {
              key: 'eng',
              header: 'Engagement',
              render: row => (
                <Badge label={`${row.engagementPct}%`} variant={row.engagementPct >= 85 ? 'success' : 'warning'} />
              ),
            },
          ]}
        />
      </div>
    </>
  );
}
