'use client';

import { DataTable } from '@/components/admin/DataTable';
import { ReportLayout } from '@/components/analytics/ReportLayout';
import { ChartCard } from '@/components/charts/ChartCard';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import {
  getTicketVolumeByCategory,
  mockParentEngagementByClass,
  parentEngagementTrend,
} from '@/mocks/principalInsights.mock';

export function PrincipalParentEngagementScreen({ slug: _slug }: { slug: string }) {
  const ticketBars = getTicketVolumeByCategory();
  const totalUnread = mockParentEngagementByClass.reduce((s, r) => s + r.unreadMessages, 0);
  const avgParentPct = Math.round(
    mockParentEngagementByClass.reduce((s, r) => s + r.parentAccountsPct, 0) /
      mockParentEngagementByClass.length,
  );

  return (
    <ReportLayout
      title="Parent engagement"
      subtitle="Family app usage, messaging, and support volume"
      kpis={[
        { label: 'Active parent accounts', value: `${avgParentPct}%`, trend: 'up' },
        { label: 'Avg weekly app opens', value: '3.5', change: 'Per linked parent', trend: 'up' },
        { label: 'Unread messages', value: String(totalUnread), trend: totalUnread > 10 ? 'down' : 'neutral' },
        { label: 'Open tickets', value: '3', change: '1 escalated', trend: 'neutral' },
      ]}
    >
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <ChartCard title="Parent app opens" subtitle="Weekly trend (school-wide)">
          <LineChart data={parentEngagementTrend} valueFormatter={v => `${v}%`} />
        </ChartCard>
        <ChartCard title="Tickets by category" subtitle="Current term">
          <BarChart data={ticketBars} />
        </ChartCard>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={[...mockParentEngagementByClass].sort((a, b) => a.parentAccountsPct - b.parentAccountsPct)}
          keyExtractor={row => row.classSection}
          emptyMessage="No data."
          columns={[
            { key: 'class', header: 'Class', render: row => <span className="font-medium">{row.classSection}</span> },
            { key: 'pct', header: 'Parent accounts %', render: row => `${row.parentAccountsPct}%` },
            { key: 'opens', header: 'Avg weekly opens', render: row => row.avgWeeklyOpens },
            { key: 'unread', header: 'Unread messages', render: row => row.unreadMessages },
          ]}
        />
      </div>
    </ReportLayout>
  );
}
