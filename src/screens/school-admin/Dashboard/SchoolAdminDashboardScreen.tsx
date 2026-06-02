'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { StatCard } from '@/components/admin/StatCard';
import { ChartCard } from '@/components/charts/ChartCard';
import { LineChart } from '@/components/charts/LineChart';
import { DataTable } from '@/components/admin/DataTable';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { AnalyticsToolbar } from '@/components/analytics/AnalyticsToolbar';
import { Button } from '@/components/ui/Button';
import { schoolAdminBasePath } from '@/lib/schoolAdmin';
import { useAnalyticsFilters } from '@/hooks/useAnalyticsFilters';
import { parseAnalyticsFilters } from '@/lib/analytics/queryParams';
import { getSchoolBranding, getSchoolActivity } from '@/mocks/schoolAdminG1G3.mock';
import { getSchoolDashboardAnalytics } from '@/mocks/analytics/schoolAnalytics.mock';

export type SchoolAdminDashboardScreenProps = {
  slug: string;
};

/** G1 — School admin dashboard */
export function SchoolAdminDashboardScreen({ slug }: SchoolAdminDashboardScreenProps) {
  const base = schoolAdminBasePath(slug);
  const branding = getSchoolBranding(slug);
  const searchParams = useSearchParams();
  const filters = useMemo(() => parseAnalyticsFilters(searchParams), [searchParams]);
  const analytics = getSchoolDashboardAnalytics(slug, filters);
  const activity = getSchoolActivity(slug);
  const { draft, setDraft, apply, reset, syncDraft } = useAnalyticsFilters();

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        subtitle={`${branding.displayName} — overview`}
        actions={
          <Link href={`${base}/reports/export`}>
            <Button label="Export reports" size="sm" variant="outline" />
          </Link>
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
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {analytics.kpis.map(kpi => (
          <StatCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            change={kpi.change}
            trend={kpi.trend}
          />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <ChartCard title="Enrollment" subtitle="Active students">
          <LineChart data={analytics.enrollmentTrend} />
        </ChartCard>
        <ChartCard title="Homework completion" subtitle="Weekly average %">
          <LineChart data={analytics.homeworkTrend} valueFormatter={v => `${v}%`} />
        </ChartCard>
        <ChartCard title="Engagement" subtitle="Quiz attempts trend">
          <LineChart data={analytics.engagementTrend} />
        </ChartCard>
      </div>

      <section className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h2 className="text-sm font-semibold text-[var(--color-text)]">Reports</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {(
            [
              ['homework', 'Homework'],
              ['engagement', 'Engagement'],
              ['attendance', 'Attendance'],
              ['leaderboards', 'Leaderboards'],
              ['visits', 'Visits'],
              ['chat', 'Chat audit'],
              ['export', 'Export'],
            ] as const
          ).map(([segment, label]) => (
            <Link key={segment} href={`${base}/reports/${segment}`}>
              <Button label={label} size="sm" variant="outline" />
            </Link>
          ))}
          <Link href={`${base}/principal`}>
            <Button label="View as principal" size="sm" variant="ghost" />
          </Link>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h2 className="text-lg font-semibold text-[var(--color-text)]">Recent activity</h2>
        <div className="mt-4">
          <DataTable
            data={activity}
            keyExtractor={row => row.id}
            emptyMessage="No recent activity."
            columns={[
              { key: 'action', header: 'Action', render: row => row.action },
              { key: 'detail', header: 'Detail', render: row => row.detail },
              { key: 'when', header: 'When', render: row => row.when },
            ]}
          />
        </div>
      </section>
    </>
  );
}
