'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { DataTable } from '@/components/admin/DataTable';
import { ChartCard } from '@/components/charts/ChartCard';
import { LineChart } from '@/components/charts/LineChart';
import { StackedBarChart } from '@/components/charts/StackedBarChart';
import { ReportLayout } from '@/components/analytics/ReportLayout';
import { Badge } from '@/components/ui/Badge';
import { downloadCsv } from '@/lib/files/download';
import { parseAnalyticsFilters } from '@/lib/analytics/queryParams';
import { getSchoolHomeworkReport } from '@/mocks/analytics/schoolAnalytics.mock';

export function HomeworkReportView({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const filters = useMemo(() => parseAnalyticsFilters(searchParams), [searchParams]);
  const report = getSchoolHomeworkReport(slug, filters);

  const exportCsv = () => {
    downloadCsv(`homework-${slug}.csv`, [
      ['Class', 'Assigned', 'Submitted', 'Graded', 'Completion %'],
      ...report.rows.map(r => [
        r.classSection,
        String(r.assigned),
        String(r.submitted),
        String(r.graded),
        String(r.completionPct),
      ]),
    ]);
  };

  return (
    <ReportLayout
      title="Homework completion"
      subtitle="Trends and class breakdown for the selected period"
      kpis={report.kpis}
      onExport={exportCsv}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Weekly completion trend" subtitle="Average completion rate">
          <LineChart data={report.trend} valueFormatter={v => `${v}%`} />
        </ChartCard>
        <ChartCard title="Submission status" subtitle="By class">
          <StackedBarChart
            data={report.stacked}
            series={[
              { key: 'submitted', label: 'Submitted' },
              { key: 'pending', label: 'Pending' },
            ]}
          />
        </ChartCard>
      </div>

      <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={report.rows}
          keyExtractor={row => row.id}
          emptyMessage="No data for selected filters."
          columns={[
            {
              key: 'class',
              header: 'Class',
              render: row => <span className="font-medium">{row.classSection}</span>,
            },
            { key: 'assigned', header: 'Assigned', render: row => row.assigned },
            { key: 'submitted', header: 'Submitted', render: row => row.submitted },
            { key: 'graded', header: 'Graded', render: row => row.graded },
            {
              key: 'pct',
              header: 'Completion',
              render: row => (
                <Badge
                  label={`${row.completionPct}%`}
                  variant={
                    row.completionPct >= 80 ? 'success' : row.completionPct >= 60 ? 'warning' : 'error'
                  }
                />
              ),
            },
          ]}
        />
      </div>
    </ReportLayout>
  );
}
