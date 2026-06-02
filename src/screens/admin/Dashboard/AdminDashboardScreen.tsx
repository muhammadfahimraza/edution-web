'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { StatCard } from '@/components/admin/StatCard';
import { DataTable } from '@/components/admin/DataTable';
import { ChartCard } from '@/components/charts/ChartCard';
import { LineChart } from '@/components/charts/LineChart';
import { StackedBarChart } from '@/components/charts/StackedBarChart';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { AnalyticsToolbar } from '@/components/analytics/AnalyticsToolbar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAnalyticsFilters } from '@/hooks/useAnalyticsFilters';
import { parseAnalyticsFilters } from '@/lib/analytics/queryParams';
import { getPlatformDashboard, platformSchoolOptions } from '@/mocks/analytics/platformAnalytics.mock';
import { ticketSlaRows, type TicketSlaRow } from '@/mocks/adminPlatform.mock';

function priorityVariant(p: TicketSlaRow['priority']) {
  if (p === 'high') return 'error' as const;
  if (p === 'medium') return 'warning' as const;
  return 'neutral' as const;
}

/** F1 — Platform dashboard */
export function AdminDashboardScreen() {
  const searchParams = useSearchParams();
  const filters = useMemo(() => parseAnalyticsFilters(searchParams), [searchParams]);
  const data = getPlatformDashboard(filters);
  const { draft, setDraft, apply, reset, syncDraft } = useAnalyticsFilters();

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        subtitle="Platform health at a glance"
        actions={
          <>
            <Link href="/admin/analytics">
              <Button label="Full analytics" size="sm" variant="outline" />
            </Link>
            <Link href="/admin/schools/new">
              <Button label="Add school" size="sm" />
            </Link>
          </>
        }
      />

      <div className="mb-6">
        <AnalyticsToolbar
          draft={draft}
          onChange={setDraft}
          onApply={apply}
          onReset={() => {
            reset();
            syncDraft();
          }}
          showTerm={false}
          showClass={false}
          showSchool
          schoolOptions={platformSchoolOptions}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {data.kpis.slice(0, 8).map(kpi => (
          <StatCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            change={kpi.change}
            trend={kpi.trend}
          />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ChartCard title="New schools onboarded" subtitle="Monthly">
          <LineChart data={data.schoolsOnboarded} />
        </ChartCard>
        <ChartCard title="Homework completion" subtitle="Platform average %">
          <LineChart data={data.homeworkCompletion} valueFormatter={v => `${v}%`} />
        </ChartCard>
        <ChartCard title="Ticket volume" subtitle="By priority" className="lg:col-span-2">
          <StackedBarChart
            data={data.ticketVolume}
            series={[
              { key: 'high', label: 'High' },
              { key: 'medium', label: 'Medium' },
              { key: 'low', label: 'Low' },
            ]}
          />
        </ChartCard>
      </div>

      <section className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-[var(--color-text)]">Ticket SLA — L2 queue</h2>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Open & escalated</p>
          </div>
          <Link href="/admin/tickets">
            <Button label="View all" size="sm" variant="outline" />
          </Link>
        </div>
        <div className="mt-4">
          <DataTable
            data={ticketSlaRows}
            keyExtractor={row => row.id}
            columns={[
              { key: 'school', header: 'School', render: row => row.schoolName },
              { key: 'subject', header: 'Subject', render: row => row.subject },
              {
                key: 'priority',
                header: 'Priority',
                render: row => <Badge label={row.priority} variant={priorityVariant(row.priority)} />,
              },
              { key: 'age', header: 'Age', render: row => `${row.ageHours}h` },
              {
                key: 'status',
                header: 'Status',
                render: row => (
                  <Badge label={row.status} variant={row.status === 'escalated' ? 'error' : 'warning'} />
                ),
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
