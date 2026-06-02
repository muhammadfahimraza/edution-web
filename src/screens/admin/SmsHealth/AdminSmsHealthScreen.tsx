'use client';

import { StatCard } from '@/components/admin/StatCard';
import { DataTable } from '@/components/admin/DataTable';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { ChartCard } from '@/components/charts/ChartCard';
import { LineChart } from '@/components/charts/LineChart';
import { getSmsHealthAnalytics } from '@/mocks/analytics/platformAnalytics.mock';
import { defaultFilters } from '@/lib/analytics/types';
import { mockSmsHealth, smsDeliveryBySchool, type SmsProviderStatus } from '@/mocks/adminF10F17.mock';

function statusVariant(status: SmsProviderStatus) {
  if (status === 'healthy') return 'success' as const;
  if (status === 'degraded') return 'warning' as const;
  return 'error' as const;
}

/** F17 — SMS health dashboard */
export function AdminSmsHealthScreen() {
  const smsAnalytics = getSmsHealthAnalytics(defaultFilters);
  const totalSent = mockSmsHealth.reduce((sum, m) => sum + m.sent24h, 0);
  const totalFailed = mockSmsHealth.reduce((sum, m) => sum + m.failed24h, 0);
  const overallRate = totalSent > 0 ? ((totalSent - totalFailed) / totalSent) * 100 : 0;

  return (
    <>
      <AdminPageHeader
        title="SMS health"
        subtitle="Provider status and delivery metrics (mock data)"
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Sent (24h)" value={totalSent.toLocaleString()} />
        <StatCard label="Failed (24h)" value={totalFailed.toLocaleString()} />
        <StatCard label="Overall success" value={`${overallRate.toFixed(1)}%`} />
        <StatCard label="Providers" value={String(mockSmsHealth.length)} />
      </div>

      <ChartCard title="7-day success rate" subtitle="Platform average %" className="mb-8">
        <LineChart data={smsAnalytics.line} valueFormatter={v => `${v}%`} />
      </ChartCard>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold">Providers</h2>
        <div className="grid gap-4 lg:grid-cols-3">
          {mockSmsHealth.map(metric => (
            <article
              key={metric.provider}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold">{metric.provider}</h3>
                <Badge label={metric.status} variant={statusVariant(metric.status)} />
              </div>
              <dl className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-[var(--color-text-secondary)]">Success rate</dt>
                  <dd className="font-medium">{metric.successRatePct}%</dd>
                </div>
                <div>
                  <dt className="text-[var(--color-text-secondary)]">Avg latency</dt>
                  <dd className="font-medium">{metric.avgLatencyMs} ms</dd>
                </div>
                <div>
                  <dt className="text-[var(--color-text-secondary)]">Sent 24h</dt>
                  <dd className="font-medium">{metric.sent24h.toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-[var(--color-text-secondary)]">Failed 24h</dt>
                  <dd className="font-medium">{metric.failed24h.toLocaleString()}</dd>
                </div>
              </dl>
              {metric.lastIncident ? (
                <p className="mt-3 text-xs text-[var(--color-warning)]">Last incident: {metric.lastIncident}</p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold">Delivery by school (24h)</h2>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <DataTable
            data={smsDeliveryBySchool}
            keyExtractor={row => row.schoolName}
            emptyMessage="No delivery data."
            columns={[
              { key: 'school', header: 'School', render: row => row.schoolName },
              { key: 'sent', header: 'Sent', render: row => row.sent },
              { key: 'failed', header: 'Failed', render: row => row.failed },
              {
                key: 'rate',
                header: 'Success rate',
                render: row =>
                  row.sent === 0 ? (
                    <Badge label="No SMS" variant="neutral" />
                  ) : (
                    <Badge label={`${row.rate}%`} variant={row.rate >= 95 ? 'success' : 'warning'} />
                  ),
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
