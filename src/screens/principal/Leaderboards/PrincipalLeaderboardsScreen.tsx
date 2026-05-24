'use client';

import { useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { LeaderboardRow } from '@/components/shared/LeaderboardRow';
import { mockClassLeaderboard } from '@/mocks/principal.mock';

const SCOPES = ['Class', 'Grade', 'School'] as const;

export function PrincipalLeaderboardsScreen() {
  const [scope, setScope] = useState<(typeof SCOPES)[number]>('Class');

  return (
    <>
      <AdminPageHeader title="Leaderboards" subtitle="Student rankings by scope" />

      <div className="mb-4 flex gap-2">
        {SCOPES.map(s => (
          <button
            key={s}
            type="button"
            onClick={() => setScope(s)}
            className={
              scope === s
                ? 'rounded-full bg-[var(--color-primary)] px-4 py-1.5 text-sm font-semibold text-white'
                : 'rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-sm font-medium text-[var(--color-text-secondary)]'
            }>
            {s}
          </button>
        ))}
      </div>

      {scope !== 'Class' ? (
        <p className="mb-4 rounded-lg bg-[var(--color-background)] px-4 py-3 text-sm text-[var(--color-text-secondary)]">
          Showing sample <strong>Class</strong> rankings. {scope} view — UI demo.
        </p>
      ) : null}

      <div className="mb-6 flex flex-col gap-2 lg:hidden">
        {mockClassLeaderboard.slice(0, 5).map(row => (
          <LeaderboardRow
            key={row.rank}
            rank={row.rank}
            name={row.name}
            subtitle={row.classSection}
            points={row.points}
            change={row.change}
            highlight={row.rank <= 3}
          />
        ))}
      </div>

      <div className="hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] lg:block">
        <DataTable
          data={mockClassLeaderboard}
          keyExtractor={row => String(row.rank)}
          emptyMessage="No rankings."
          columns={[
            { key: 'rank', header: '#', render: row => <span className="font-bold">{row.rank}</span> },
            { key: 'name', header: 'Student', render: row => row.name },
            { key: 'class', header: 'Class', render: row => row.classSection },
            { key: 'pts', header: 'Points', render: row => row.points.toLocaleString() },
            {
              key: 'chg',
              header: 'Change',
              render: row => (
                <span className={row.change >= 0 ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]'}>
                  {row.change >= 0 ? '+' : ''}{row.change}
                </span>
              ),
            },
          ]}
        />
      </div>
    </>
  );
}
