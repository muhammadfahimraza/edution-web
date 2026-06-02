'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { ChartCard } from '@/components/charts/ChartCard';
import { BarChart } from '@/components/charts/BarChart';
import { Badge } from '@/components/ui/Badge';
import { schoolPrincipalBasePath } from '@/lib/schoolPortal';
import { getClassHealthRows } from '@/mocks/principalInsights.mock';

export function PrincipalClassHealthScreen({ slug }: { slug: string }) {
  const base = schoolPrincipalBasePath(slug);
  const rows = useMemo(() => getClassHealthRows(slug), [slug]);

  const chartData = rows.map(r => ({
    label: r.classSection,
    value: Math.round((r.homeworkPct + r.attendancePct + r.engagementPct) / 3),
  }));

  return (
    <>
      <AdminPageHeader
        title="Class health"
        subtitle="Homework, attendance, and engagement by class section"
      />

      <div className="mb-6">
        <ChartCard title="Composite health score" subtitle="Average of homework, attendance, and engagement %">
          <BarChart data={chartData} valueFormatter={v => `${v}%`} />
        </ChartCard>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={rows}
          keyExtractor={row => row.id}
          emptyMessage="No class data."
          columns={[
            { key: 'class', header: 'Class', render: row => <span className="font-medium">{row.classSection}</span> },
            { key: 'hw', header: 'Homework %', render: row => `${row.homeworkPct}%` },
            { key: 'att', header: 'Attendance %', render: row => `${row.attendancePct}%` },
            { key: 'eng', header: 'Engagement %', render: row => `${row.engagementPct}%` },
            { key: 'tickets', header: 'Open tickets', render: row => row.openTickets },
            {
              key: 'status',
              header: 'Status',
              render: row => (
                <Badge
                  label={row.needsAttention ? 'Needs attention' : 'On track'}
                  variant={row.needsAttention ? 'warning' : 'success'}
                />
              ),
            },
            {
              key: 'actions',
              header: '',
              render: row => (
                <div className="flex flex-wrap gap-2">
                  <Link href={`${base}/homework`} className="text-xs text-[var(--color-primary)] hover:underline">
                    Homework
                  </Link>
                  <Link href={`${base}/attendance`} className="text-xs text-[var(--color-primary)] hover:underline">
                    Attendance
                  </Link>
                  <Link href={`${base}/engagement`} className="text-xs text-[var(--color-primary)] hover:underline">
                    Engagement
                  </Link>
                </div>
              ),
            },
          ]}
        />
      </div>
    </>
  );
}
