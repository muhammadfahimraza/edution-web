'use client';

import Link from 'next/link';
import { StatCard } from '@/components/admin/StatCard';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { schoolPrincipalBasePath } from '@/lib/schoolPortal';
import { getPrincipalKpis, principalAlerts } from '@/mocks/principal.mock';
import { cn } from '@/lib/utils';

export function PrincipalDashboardScreen({ slug }: { slug: string }) {
  const base = schoolPrincipalBasePath(slug);
  const kpis = getPrincipalKpis(slug);

  return (
    <>
      <AdminPageHeader title="Principal dashboard" subtitle="School KPIs and alerts at a glance" />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map(kpi => (
          <StatCard key={kpi.label} label={kpi.label} value={kpi.value} change={kpi.change} trend={kpi.trend} />
        ))}
      </div>

      <section className="mt-6">
        <h2 className="mb-3 text-lg font-semibold">Alerts</h2>
        <ul className="flex flex-col gap-2">
          {principalAlerts.map(alert => (
            <li
              key={alert.id}
              className={cn(
                'flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-sm',
                alert.type === 'warning'
                  ? 'border-[var(--color-warning)]/40 bg-[var(--color-warning)]/10'
                  : 'border-[var(--color-border)] bg-[var(--color-surface)]',
              )}>
              <span>{alert.message}</span>
              {alert.href ? (
                <Link href={`${base}/${alert.href}`} className="shrink-0 font-medium text-[var(--color-primary)] hover:underline">
                  View
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { href: 'homework', label: 'Homework report', desc: 'Completion by class' },
          { href: 'tickets', label: 'Tickets', desc: 'Parent & staff support' },
          { href: 'announcements', label: 'Announcements', desc: 'School-wide messages' },
        ].map(item => (
          <Link
            key={item.href}
            href={`${base}/${item.href}`}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 transition-shadow hover:shadow-md">
            <h3 className="font-semibold">{item.label}</h3>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{item.desc}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
