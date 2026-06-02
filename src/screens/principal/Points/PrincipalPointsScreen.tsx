'use client';

import { useMemo, useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { ReportLayout } from '@/components/analytics/ReportLayout';
import { Badge } from '@/components/ui/Badge';
import {
  getLeaderboardByScope,
  mockSchoolMeritEvents,
  type PrincipalLeaderboardScope,
} from '@/mocks/principalInsights.mock';
import { cn } from '@/lib/utils';

const SCOPES: { id: PrincipalLeaderboardScope; label: string }[] = [
  { id: 'class', label: 'Class' },
  { id: 'grade', label: 'Grade' },
  { id: 'school', label: 'School' },
];

export function PrincipalPointsScreen({ slug: _slug }: { slug: string }) {
  const [scope, setScope] = useState<PrincipalLeaderboardScope>('class');
  const leaderboard = useMemo(() => getLeaderboardByScope(scope), [scope]);

  const totalPoints = mockSchoolMeritEvents.reduce((s, e) => s + e.points, 0);

  return (
    <ReportLayout
      title="Points & merit"
      subtitle="School-wide points, awards, and rankings"
      kpis={[
        { label: 'Points issued (term)', value: String(totalPoints + 8420), trend: 'up' },
        { label: 'Merit events', value: String(mockSchoolMeritEvents.length), trend: 'neutral' },
        { label: 'Avg per student', value: '156', change: '512 active students', trend: 'up' },
        { label: 'Top student', value: '842 pts', change: 'Fatima Ahmed · 9-A', trend: 'up' },
      ]}
    >
      <div className="mb-6 flex gap-2">
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

      <div className="mb-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={leaderboard}
          keyExtractor={row => `${row.rank}-${row.name}`}
          emptyMessage="No rankings."
          columns={[
            { key: 'rank', header: '#', render: row => row.rank },
            { key: 'name', header: scope === 'grade' ? 'Grade' : 'Student', render: row => <span className="font-medium">{row.name}</span> },
            { key: 'class', header: 'Class', render: row => row.classSection },
            { key: 'pts', header: 'Points', render: row => row.points },
            {
              key: 'chg',
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

      <section>
        <h2 className="mb-3 text-sm font-semibold">Recent merit awards</h2>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <DataTable
            data={mockSchoolMeritEvents}
            keyExtractor={row => row.id}
            columns={[
              { key: 'date', header: 'Date', render: row => row.date },
              { key: 'student', header: 'Student / class', render: row => (
                <div>
                  <p className="font-medium">{row.studentName}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{row.classSection}</p>
                </div>
              )},
              {
                key: 'source',
                header: 'Source',
                render: row => <Badge label={row.source} variant="primary" />,
              },
              { key: 'pts', header: 'Points', render: row => `+${row.points}` },
              { key: 'note', header: 'Note', render: row => row.note },
            ]}
          />
        </div>
      </section>
    </ReportLayout>
  );
}
