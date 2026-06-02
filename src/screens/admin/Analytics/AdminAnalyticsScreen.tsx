'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnalyticsKpiRow } from '@/components/analytics/AnalyticsKpiRow';
import { AnalyticsToolbar } from '@/components/analytics/AnalyticsToolbar';
import { ChartCard } from '@/components/charts/ChartCard';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { StackedBarChart } from '@/components/charts/StackedBarChart';
import { DonutChart } from '@/components/charts/DonutChart';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { DataTable } from '@/components/admin/DataTable';
import { useAnalyticsFilters } from '@/hooks/useAnalyticsFilters';
import { parseAnalyticsFilters } from '@/lib/analytics/queryParams';
import {
  getPlatformAnalyticsTab,
  platformSchoolOptions,
  type PlatformAnalyticsTab,
} from '@/mocks/analytics/platformAnalytics.mock';
import { cn } from '@/lib/utils';

const TABS: { id: PlatformAnalyticsTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'schools', label: 'Schools' },
  { id: 'learning', label: 'Learning' },
  { id: 'support', label: 'Support' },
  { id: 'comms', label: 'Comms' },
];

export function AdminAnalyticsScreen() {
  const [tab, setTab] = useState<PlatformAnalyticsTab>('overview');
  const searchParams = useSearchParams();
  const filters = useMemo(() => parseAnalyticsFilters(searchParams), [searchParams]);
  const data = getPlatformAnalyticsTab(tab, filters);
  const { draft, setDraft, apply, reset, syncDraft } = useAnalyticsFilters();

  return (
    <>
      <AdminPageHeader
        title="Platform analytics"
        subtitle="Product metrics across all schools (mock data)"
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
          showSchool
          schoolOptions={platformSchoolOptions}
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {TABS.map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors',
              tab === t.id
                ? 'bg-[var(--color-primary)] text-white'
                : 'border border-[var(--color-border)] bg-white text-[var(--color-text-secondary)]',
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {'kpis' in data && data.kpis ? (
        <div className="mb-6">
          <AnalyticsKpiRow metrics={data.kpis} />
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        {'chart' in data && data.chart ? (
          <ChartCard title="Trend">
            <LineChart data={data.chart} />
          </ChartCard>
        ) : null}
        {'line' in data && data.line ? (
          <ChartCard title="Trend">
            <LineChart data={data.line} valueFormatter={v => (tab === 'comms' ? `${v}%` : String(v))} />
          </ChartCard>
        ) : null}
        {'bar' in data && data.bar ? (
          <ChartCard title="Seat utilization by school">
            <BarChart data={data.bar} valueFormatter={v => `${v}%`} />
          </ChartCard>
        ) : null}
        {'donut' in data && data.donut ? (
          <ChartCard title="School status mix">
            <DonutChart data={data.donut} />
          </ChartCard>
        ) : null}
        {'stacked' in data && data.stacked ? (
          <ChartCard title="Homework status" className="lg:col-span-2">
            <StackedBarChart
              data={data.stacked}
              series={[
                { key: 'submitted', label: 'Submitted' },
                { key: 'late', label: 'Late' },
                { key: 'missing', label: 'Missing' },
              ]}
            />
          </ChartCard>
        ) : null}
      </div>

      {'table' in data && data.table ? (
        <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <DataTable
            data={data.table}
            keyExtractor={row => row.schoolName}
            columns={[
              { key: 'school', header: 'School', render: row => row.schoolName },
              { key: 'sent', header: 'Sent', render: row => row.sent },
              { key: 'failed', header: 'Failed', render: row => row.failed },
              { key: 'rate', header: 'Rate', render: row => row.rate },
            ]}
          />
        </div>
      ) : null}
    </>
  );
}
