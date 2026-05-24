'use client';

import { DataTable } from '@/components/admin/DataTable';
import { StatCard } from '@/components/admin/StatCard';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { mockVisitAssessments } from '@/mocks/principal.mock';

export function PrincipalVisitSummaryScreen() {
  const totalPoints = mockVisitAssessments.reduce((s, v) => s + v.pointsAwarded, 0);
  const avgScore =
    mockVisitAssessments.reduce((s, v) => s + v.avgScore, 0) / mockVisitAssessments.length;

  return (
    <>
      <AdminPageHeader title="Visit assessment summary" subtitle="Field assessor visits and merit awards" />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Visits (term)" value={String(mockVisitAssessments.length)} />
        <StatCard label="Avg score" value={avgScore.toFixed(1)} change="Out of 5.0" />
        <StatCard label="Points awarded" value={totalPoints.toLocaleString()} />
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={mockVisitAssessments}
          keyExtractor={row => row.id}
          emptyMessage="No visits recorded."
          columns={[
            { key: 'date', header: 'Date', render: row => row.visitDate },
            { key: 'assessor', header: 'Assessor', render: row => row.assessor },
            { key: 'classes', header: 'Classes', render: row => row.classesVisited },
            { key: 'score', header: 'Avg score', render: row => row.avgScore.toFixed(1) },
            { key: 'points', header: 'Points', render: row => row.pointsAwarded },
            { key: 'notes', header: 'Notes', render: row => <span className="text-[var(--color-text-secondary)]">{row.notes}</span> },
          ]}
        />
      </div>
    </>
  );
}
