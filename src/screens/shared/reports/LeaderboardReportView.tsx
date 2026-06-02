'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { DataTable } from '@/components/admin/DataTable';
import { ReportLayout } from '@/components/analytics/ReportLayout';
import { parseAnalyticsFilters } from '@/lib/analytics/queryParams';
import { getSchoolLeaderboardReport } from '@/mocks/analytics/schoolAnalytics.mock';

export function LeaderboardReportView({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const filters = useMemo(() => parseAnalyticsFilters(searchParams), [searchParams]);
  const { rows, termId } = getSchoolLeaderboardReport(slug, filters);

  return (
    <ReportLayout
      title="Leaderboards"
      subtitle={`Student rankings · ${termId}`}
      kpis={[
        { label: 'Students ranked', value: String(rows.length), trend: 'neutral' },
        { label: 'Top score', value: String(rows[0]?.points ?? 0), trend: 'up' },
        { label: 'Term', value: termId, trend: 'neutral' },
        { label: 'Classes', value: '5', trend: 'neutral' },
      ]}
    >
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={rows}
          keyExtractor={row => String(row.rank)}
          columns={[
            { key: 'rank', header: '#', render: row => row.rank },
            { key: 'name', header: 'Student', render: row => row.name },
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
