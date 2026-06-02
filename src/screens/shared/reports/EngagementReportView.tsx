'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { DataTable } from '@/components/admin/DataTable';
import { ChartCard } from '@/components/charts/ChartCard';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { ReportLayout } from '@/components/analytics/ReportLayout';
import { Badge } from '@/components/ui/Badge';
import { downloadCsv } from '@/lib/files/download';
import { parseAnalyticsFilters } from '@/lib/analytics/queryParams';
import { getSchoolEngagementReport } from '@/mocks/analytics/schoolAnalytics.mock';

export function EngagementReportView({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const filters = useMemo(() => parseAnalyticsFilters(searchParams), [searchParams]);
  const report = getSchoolEngagementReport(slug, filters);

  const exportCsv = () => {
    downloadCsv(`engagement-${slug}.csv`, [
      ['Class', 'Videos watched', 'Quiz attempts', 'Engagement %'],
      ...report.byClass.map(r => [
        r.classSection,
        String(r.videosWatched),
        String(r.quizAttempts),
        String(r.engagementPct),
      ]),
    ]);
  };

  const classBar = report.byClass.map(r => ({
    label: r.classSection,
    value: r.engagementPct,
  }));

  return (
    <ReportLayout
      title="Engagement"
      subtitle="Videos, quizzes, and Spotlight activity"
      kpis={report.kpis}
      onExport={exportCsv}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Quiz attempts" subtitle="Monthly trend">
          <LineChart data={report.trend} />
        </ChartCard>
        <ChartCard title="Engagement by class" subtitle="Composite score">
          <BarChart data={classBar} valueFormatter={v => `${v}%`} />
        </ChartCard>
      </div>

      <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={report.byClass}
          keyExtractor={row => row.classSection}
          columns={[
            { key: 'class', header: 'Class', render: row => row.classSection },
            { key: 'videos', header: 'Videos', render: row => row.videosWatched },
            { key: 'quizzes', header: 'Quizzes', render: row => row.quizAttempts },
            {
              key: 'eng',
              header: 'Engagement',
              render: row => (
                <Badge
                  label={`${row.engagementPct}%`}
                  variant={row.engagementPct >= 75 ? 'success' : 'warning'}
                />
              ),
            },
          ]}
        />
      </div>
    </ReportLayout>
  );
}
