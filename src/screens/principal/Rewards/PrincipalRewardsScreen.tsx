'use client';

import { DataTable } from '@/components/admin/DataTable';
import { ReportLayout } from '@/components/analytics/ReportLayout';
import { ChartCard } from '@/components/charts/ChartCard';
import { BarChart } from '@/components/charts/BarChart';
import { Badge } from '@/components/ui/Badge';
import { mockSchoolRedemptions, popularRewards } from '@/mocks/principalInsights.mock';

function statusVariant(s: string) {
  if (s === 'delivered') return 'success' as const;
  if (s === 'processing') return 'accent' as const;
  return 'warning' as const;
}

export function PrincipalRewardsScreen({ slug: _slug }: { slug: string }) {
  const pending = mockSchoolRedemptions.filter(r => r.status === 'pending').length;
  const pointsSpent = mockSchoolRedemptions.reduce((s, r) => s + r.pointsSpent, 0);

  return (
    <ReportLayout
      title="Rewards & redemptions"
      subtitle="School catalogue redemptions (read-only summary)"
      kpis={[
        { label: 'Redemptions (term)', value: String(mockSchoolRedemptions.length), trend: 'up' },
        { label: 'Pending', value: String(pending), trend: pending > 0 ? 'neutral' : 'up' },
        { label: 'Points spent', value: String(pointsSpent), trend: 'neutral' },
        { label: 'Most popular', value: 'Notebook set', trend: 'neutral' },
      ]}
    >
      <div className="mb-6 max-w-lg">
        <ChartCard title="Popular rewards" subtitle="Redemption count">
          <BarChart data={popularRewards} />
        </ChartCard>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={mockSchoolRedemptions}
          keyExtractor={row => row.id}
          columns={[
            { key: 'student', header: 'Student', render: row => (
              <div>
                <p className="font-medium">{row.studentName}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">{row.classSection}</p>
              </div>
            )},
            { key: 'reward', header: 'Reward', render: row => row.rewardName },
            { key: 'pts', header: 'Points', render: row => row.pointsSpent },
            { key: 'when', header: 'Ordered', render: row => row.orderedAt },
            {
              key: 'status',
              header: 'Status',
              render: row => <Badge label={row.status} variant={statusVariant(row.status)} />,
            },
          ]}
        />
      </div>
    </ReportLayout>
  );
}
