'use client';

import { useMemo, useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { SimpleBarChart } from '@/components/admin/SimpleBarChart';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import {
  homeworkCompletionChart,
  homeworkGradeFilters,
  mockHomeworkCompletion,
} from '@/mocks/principal.mock';

export function PrincipalHomeworkReportScreen() {
  const [gradeFilter, setGradeFilter] = useState('All grades');

  const filtered = useMemo(() => {
    if (gradeFilter === 'All grades') return mockHomeworkCompletion;
    const grade = gradeFilter.replace('Grade ', '');
    return mockHomeworkCompletion.filter(r => r.classSection.startsWith(grade));
  }, [gradeFilter]);

  return (
    <>
      <AdminPageHeader title="Homework completion" subtitle="Filters, trend chart, and class breakdown" />

      <div className="mb-4 flex flex-wrap gap-2">
        {homeworkGradeFilters.map(g => (
          <button
            key={g}
            type="button"
            onClick={() => setGradeFilter(g)}
            className={
              gradeFilter === g
                ? 'rounded-full bg-[var(--color-primary)] px-4 py-1.5 text-sm font-semibold text-white'
                : 'rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-sm font-medium text-[var(--color-text-secondary)]'
            }>
            {g}
          </button>
        ))}
      </div>

      <section className="mb-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h2 className="text-lg font-semibold">Weekly completion trend</h2>
        <SimpleBarChart data={homeworkCompletionChart} className="mt-4" />
      </section>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={filtered}
          keyExtractor={row => row.id}
          emptyMessage="No data for this filter."
          columns={[
            { key: 'class', header: 'Class', render: row => <span className="font-medium">{row.classSection}</span> },
            { key: 'assigned', header: 'Assigned', render: row => row.assigned },
            { key: 'submitted', header: 'Submitted', render: row => row.submitted },
            { key: 'graded', header: 'Graded', render: row => row.graded },
            {
              key: 'pct',
              header: 'Completion',
              render: row => (
                <Badge
                  label={`${row.completionPct}%`}
                  variant={row.completionPct >= 80 ? 'success' : row.completionPct >= 60 ? 'warning' : 'error'}
                />
              ),
            },
          ]}
        />
      </div>
    </>
  );
}
