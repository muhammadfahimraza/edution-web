import { StatCard } from '@/components/admin/StatCard';
import type { KpiMetric } from '@/lib/analytics/types';

export function AnalyticsKpiRow({ metrics }: { metrics: KpiMetric[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map(m => (
        <StatCard
          key={m.label}
          label={m.label}
          value={m.value}
          change={m.change}
          trend={m.trend}
        />
      ))}
    </div>
  );
}
