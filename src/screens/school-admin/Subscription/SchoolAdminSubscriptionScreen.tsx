'use client';

import { StatCard } from '@/components/admin/StatCard';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getSeatUsage } from '@/mocks/schoolAdminG4G12.mock';

/** G11 — Subscription / seat usage */
export function SchoolAdminSubscriptionScreen({ slug }: { slug: string }) {
  const usage = getSeatUsage(slug);
  const pct = Math.round((usage.used / usage.limit) * 100);
  const remaining = usage.limit - usage.used;

  return (
    <>
      <AdminPageHeader
        title="Subscription & seats"
        subtitle="Plan details and seat usage"
        actions={<Button label="Contact sales" size="sm" variant="outline" onClick={() => alert('Contact sales — UI demo.')} />}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Plan" value={usage.planLabel} change={`Renews ${usage.renewsOn}`} />
        <StatCard label="Seats used" value={usage.used.toLocaleString()} change={`${remaining.toLocaleString()} remaining`} trend={pct > 90 ? 'down' : 'neutral'} />
        <StatCard label="Seat limit" value={usage.limit.toLocaleString()} />
        <StatCard label="Utilization" value={`${pct}%`} trend={pct > 90 ? 'down' : 'up'} />
      </div>

      <section className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Seat usage</h2>
          <Badge label={pct >= 95 ? 'Near limit' : 'Healthy'} variant={pct >= 95 ? 'warning' : 'success'} />
        </div>
        <div className="mt-4 h-4 overflow-hidden rounded-full bg-[var(--color-background)]">
          <div
            className="h-full rounded-full bg-[var(--color-primary)] transition-all"
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
        </div>
        <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
          {usage.used.toLocaleString()} of {usage.limit.toLocaleString()} student seats in use
        </p>
      </section>

      <section className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h2 className="text-sm font-semibold">Billing contact</h2>
        <p className="mt-2 text-sm">{usage.billingEmail}</p>
        <Button className="mt-4" label="Request seat increase" size="sm" onClick={() => alert('Seat increase request sent (mock).')} />
      </section>
    </>
  );
}
