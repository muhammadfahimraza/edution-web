'use client';

import { DataTable } from '@/components/admin/DataTable';
import { SimpleBarChart } from '@/components/admin/SimpleBarChart';
import { StatCard } from '@/components/admin/StatCard';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { engagementChart, mockEngagementByClass, mockEngagementMetrics } from '@/mocks/principal.mock';

export function PrincipalEngagementScreen() {
  return (
    <>
      <AdminPageHeader title="Engagement report" subtitle="Videos, quizzes, and class activity" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockEngagementMetrics.map(m => (
          <StatCard key={m.id} label={m.label} value={m.value} change={m.sublabel} />
        ))}
      </div>

      <section className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h2 className="text-lg font-semibold">Quiz attempts trend</h2>
        <SimpleBarChart data={engagementChart} className="mt-4" />
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-lg font-semibold">By class</h2>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <DataTable
            data={mockEngagementByClass}
            keyExtractor={row => row.classSection}
            emptyMessage="No data."
            columns={[
              { key: 'class', header: 'Class', render: row => row.classSection },
              { key: 'videos', header: 'Videos watched', render: row => row.videosWatched },
              { key: 'quizzes', header: 'Quiz attempts', render: row => row.quizAttempts },
              {
                key: 'eng',
                header: 'Engagement',
                render: row => <Badge label={`${row.engagementPct}%`} variant={row.engagementPct >= 80 ? 'success' : 'warning'} />,
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
