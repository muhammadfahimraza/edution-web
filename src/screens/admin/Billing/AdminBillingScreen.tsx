'use client';

import { useMemo, useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { StatCard } from '@/components/admin/StatCard';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { ChartCard } from '@/components/charts/ChartCard';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import { getBillingAnalytics } from '@/mocks/analytics/platformAnalytics.mock';
import { defaultFilters } from '@/lib/analytics/types';
import { mockBillingRows } from '@/mocks/adminF4F9.mock';

function paymentVariant(status: (typeof mockBillingRows)[0]['paymentStatus']) {
  if (status === 'paid') return 'success' as const;
  if (status === 'due') return 'warning' as const;
  return 'error' as const;
}

/**
 * F4 — Per-school seat billing table
 */
export function AdminBillingScreen() {
  const { showToast } = useToast();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mockBillingRows;
    return mockBillingRows.filter(r => r.schoolName.toLowerCase().includes(q));
  }, [query]);

  const billingAnalytics = getBillingAnalytics(defaultFilters);
  const overSeatCount = mockBillingRows.filter(r => r.overSeat).length;
  const overdueCount = mockBillingRows.filter(r => r.paymentStatus === 'overdue').length;

  return (
    <>
      <AdminPageHeader
        title="Billing"
        subtitle="Seat usage and monthly recurring revenue by school"
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {billingAnalytics.kpis.map(kpi => (
          <StatCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            change={kpi.change}
            trend={kpi.trend}
          />
        ))}
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <ChartCard title="MRR trend" subtitle="Monthly (mock)">
          <LineChart data={billingAnalytics.mrrTrend} />
        </ChartCard>
        <ChartCard title="Schools by plan" subtitle="Count per tier">
          <BarChart data={billingAnalytics.byPlan} />
        </ChartCard>
      </div>

      <div className="mb-4 max-w-md">
        <Input
          label="Search schools"
          placeholder="School name…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={filtered}
          keyExtractor={row => row.schoolId}
          emptyMessage="No billing records match."
          columns={[
            {
              key: 'school',
              header: 'School',
              render: row => (
                <span className="font-medium">{row.schoolName}</span>
              ),
            },
            {
              key: 'plan',
              header: 'Plan',
              render: row => (
                <Badge
                  label={row.plan}
                  variant={row.plan === 'enterprise' ? 'primary' : 'neutral'}
                />
              ),
            },
            {
              key: 'seats',
              header: 'Seats used / limit',
              render: row => {
                const pct = Math.round((row.studentCount / row.seatLimit) * 100);
                return (
                  <div>
                    <span className={row.overSeat ? 'font-semibold text-[var(--color-error)]' : ''}>
                      {row.studentCount.toLocaleString()} / {row.seatLimit.toLocaleString()}
                    </span>
                    <div className="mt-1 h-1.5 w-24 overflow-hidden rounded-full bg-[var(--color-border)]">
                      <div
                        className="h-full rounded-full bg-[var(--color-primary)]"
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              },
            },
            {
              key: 'mrr',
              header: 'MRR',
              render: row => `PKR ${row.mrrPkr.toLocaleString()}`,
            },
            {
              key: 'invoice',
              header: 'Next invoice',
              render: row => row.nextInvoiceDate,
            },
            {
              key: 'payment',
              header: 'Payment',
              render: row => (
                <Badge label={row.paymentStatus} variant={paymentVariant(row.paymentStatus)} />
              ),
            },
            {
              key: 'actions',
              header: '',
              className: 'text-right',
              render: row => (
                <button
                  type="button"
                  className="text-sm font-medium text-[var(--color-primary)] hover:underline"
                  onClick={() =>
                    showToast({
                      title: 'Seat adjustment',
                      body: `Request recorded for ${row.schoolName}.`,
                    })
                  }>
                  Adjust
                </button>
              ),
            },
          ]}
        />
      </div>
    </>
  );
}
