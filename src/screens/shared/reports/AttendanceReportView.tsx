'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { DataTable } from '@/components/admin/DataTable';
import { ChartCard } from '@/components/charts/ChartCard';
import { LineChart } from '@/components/charts/LineChart';
import { ReportLayout } from '@/components/analytics/ReportLayout';
import { Badge } from '@/components/ui/Badge';
import { downloadCsv } from '@/lib/files/download';
import { parseAnalyticsFilters } from '@/lib/analytics/queryParams';
import { getSchoolAttendanceReport } from '@/mocks/analytics/schoolAnalytics.mock';

export function AttendanceReportView({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const filters = useMemo(() => parseAnalyticsFilters(searchParams), [searchParams]);
  const report = getSchoolAttendanceReport(slug, filters);

  const exportCsv = () => {
    downloadCsv(`attendance-${slug}.csv`, [
      ['Class', 'Present %', 'Late', 'Absent', 'Enrolled'],
      ...report.rows.map(r => [
        r.classSection,
        String(r.presentPct),
        String(r.late),
        String(r.absent),
        String(r.enrolled),
      ]),
    ]);
  };

  return (
    <ReportLayout
      title="Attendance"
      subtitle="Daily presence and absence patterns by class"
      kpis={report.kpis}
      onExport={exportCsv}
    >
      <ChartCard title="Daily present rate" subtitle="School-wide average">
        <LineChart data={report.dailyTrend} valueFormatter={v => `${v}%`} />
      </ChartCard>

      <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={report.rows}
          keyExtractor={row => row.id}
          columns={[
            { key: 'class', header: 'Class', render: row => row.classSection },
            {
              key: 'present',
              header: 'Present',
              render: row => (
                <Badge
                  label={`${row.presentPct}%`}
                  variant={row.presentPct >= 90 ? 'success' : row.presentPct >= 80 ? 'warning' : 'error'}
                />
              ),
            },
            { key: 'late', header: 'Late', render: row => row.late },
            { key: 'absent', header: 'Absent', render: row => row.absent },
            { key: 'enrolled', header: 'Enrolled', render: row => row.enrolled },
          ]}
        />
      </div>
    </ReportLayout>
  );
}
