'use client';

import { DataTable } from '@/components/admin/DataTable';
import { ReportLayout } from '@/components/analytics/ReportLayout';
import { getSchoolVisitsReport } from '@/mocks/analytics/schoolAnalytics.mock';

export function VisitsReportView({ slug }: { slug: string }) {
  const { rows } = getSchoolVisitsReport(slug, { preset: '30d' });

  return (
    <ReportLayout
      title="Visit assessments"
      subtitle="Field assessor visits and scores"
      kpis={[
        { label: 'Visits', value: String(rows.length), trend: 'neutral' },
        {
          label: 'Avg score',
          value: rows.length
            ? (rows.reduce((s, r) => s + r.avgScore, 0) / rows.length).toFixed(1)
            : '—',
          trend: 'up',
        },
        { label: 'Points awarded', value: String(rows.reduce((s, r) => s + r.pointsAwarded, 0)), trend: 'up' },
        { label: 'Classes visited', value: String(rows.reduce((s, r) => s + r.classesVisited, 0)), trend: 'neutral' },
      ]}
      toolbarOptions={{ showClass: false }}
    >
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={rows}
          keyExtractor={row => row.id}
          columns={[
            { key: 'date', header: 'Date', render: row => row.visitDate },
            { key: 'assessor', header: 'Assessor', render: row => row.assessor },
            { key: 'classes', header: 'Classes', render: row => row.classesVisited },
            { key: 'score', header: 'Avg score', render: row => row.avgScore },
            { key: 'points', header: 'Points', render: row => row.pointsAwarded },
            { key: 'notes', header: 'Notes', render: row => row.notes },
          ]}
        />
      </div>
    </ReportLayout>
  );
}
