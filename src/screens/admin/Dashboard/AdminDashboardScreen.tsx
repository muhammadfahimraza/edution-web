'use client';

import Link from 'next/link';
import { StatCard } from '@/components/admin/StatCard';
import { SimpleBarChart } from '@/components/admin/SimpleBarChart';
import { DataTable } from '@/components/admin/DataTable';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  platformKpis,
  schoolsChartData,
  ticketSlaRows,
  type TicketSlaRow,
} from '@/mocks/adminPlatform.mock';

function priorityVariant(p: TicketSlaRow['priority']) {
  if (p === 'high') return 'error' as const;
  if (p === 'medium') return 'warning' as const;
  return 'neutral' as const;
}

/**
 * F1 — Platform dashboard: KPIs, schools chart, ticket SLA
 */
export function AdminDashboardScreen() {
  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        subtitle="Platform health at a glance"
        actions={
          <Link href="/admin/schools/new">
            <Button label="Add school" size="sm" />
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {platformKpis.map(kpi => (
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
        <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <h2 className="text-lg font-semibold text-[var(--color-text)]">
            New schools onboarded
          </h2>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            Last 6 months (mock)
          </p>
          <SimpleBarChart data={schoolsChartData} className="mt-4" />
        </section>

        <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold text-[var(--color-text)]">
                Ticket SLA — L2 queue
              </h2>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                Open & escalated · sorted by age
              </p>
            </div>
            <Badge label="F14 soon" variant="neutral" />
          </div>
          <div className="mt-4">
            <DataTable
              data={ticketSlaRows}
              keyExtractor={row => row.id}
              emptyMessage="No tickets in queue."
              columns={[
                {
                  key: 'school',
                  header: 'School',
                  render: row => (
                    <span className="font-medium text-[var(--color-text)]">
                      {row.schoolName}
                    </span>
                  ),
                },
                {
                  key: 'subject',
                  header: 'Subject',
                  render: row => (
                    <span className="text-[var(--color-text-secondary)]">{row.subject}</span>
                  ),
                },
                {
                  key: 'priority',
                  header: 'Priority',
                  render: row => (
                    <Badge
                      label={row.priority}
                      variant={priorityVariant(row.priority)}
                    />
                  ),
                },
                {
                  key: 'age',
                  header: 'Age',
                  render: row => (
                    <span
                      className={
                        row.ageHours >= 48
                          ? 'font-semibold text-[var(--color-error)]'
                          : ''
                      }>
                      {row.ageHours}h
                    </span>
                  ),
                },
                {
                  key: 'status',
                  header: 'Status',
                  render: row => (
                    <Badge
                      label={row.status}
                      variant={row.status === 'escalated' ? 'error' : 'warning'}
                    />
                  ),
                },
              ]}
            />
          </div>
        </section>
      </div>
    </>
  );
}
