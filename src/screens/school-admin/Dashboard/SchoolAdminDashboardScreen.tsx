'use client';

import Link from 'next/link';
import { StatCard } from '@/components/admin/StatCard';
import { SimpleBarChart } from '@/components/admin/SimpleBarChart';
import { DataTable } from '@/components/admin/DataTable';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import { schoolAdminBasePath } from '@/lib/schoolAdmin';
import {
  getEnrollmentChart,
  getSchoolActivity,
  getSchoolKpis,
  getSchoolBranding,
} from '@/mocks/schoolAdminG1G3.mock';

export type SchoolAdminDashboardScreenProps = {
  slug: string;
};

/** G1 — School admin dashboard */
export function SchoolAdminDashboardScreen({ slug }: SchoolAdminDashboardScreenProps) {
  const base = schoolAdminBasePath(slug);
  const kpis = getSchoolKpis(slug);
  const chart = getEnrollmentChart(slug);
  const activity = getSchoolActivity(slug);
  const branding = getSchoolBranding(slug);

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        subtitle={`${branding.displayName} — overview`}
        actions={
          <Link href={`${base}/academic-years`}>
            <Button label="Manage terms" size="sm" variant="outline" />
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map(kpi => (
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
          <h2 className="text-lg font-semibold text-[var(--color-text)]">Enrollment trend</h2>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Active students · last 6 months</p>
          <SimpleBarChart
            data={chart.map(p => ({ month: p.month, schools: p.students }))}
            className="mt-4"
          />
        </section>

        <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold text-[var(--color-text)]">Recent activity</h2>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Latest changes in your school</p>
            </div>
          </div>
          <div className="mt-4">
            <DataTable
              data={activity}
              keyExtractor={row => row.id}
              emptyMessage="No recent activity."
              columns={[
                {
                  key: 'action',
                  header: 'Action',
                  render: row => <span className="font-medium">{row.action}</span>,
                },
                { key: 'detail', header: 'Detail', render: row => row.detail },
                { key: 'when', header: 'When', render: row => row.when },
              ]}
            />
          </div>
        </section>
      </div>

      <section className="mt-6 rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h2 className="text-sm font-semibold text-[var(--color-text)]">Quick setup</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link href={`${base}/branding`}>
            <Button label="Branding & white-label" size="sm" variant="outline" />
          </Link>
          <Link href={`${base}/academic-years`}>
            <Button label="Academic years" size="sm" variant="outline" />
          </Link>
          <Link href={`${base}/import`}>
            <Button label="Import students" size="sm" variant="outline" />
          </Link>
        </div>
      </section>
    </>
  );
}
