'use client';

import { DataTable } from '@/components/admin/DataTable';
import { ReportLayout } from '@/components/analytics/ReportLayout';
import { Badge } from '@/components/ui/Badge';
import { getSchoolChatReport } from '@/mocks/analytics/schoolAnalytics.mock';

export function ChatReportView({ slug }: { slug: string }) {
  const { kpis, rows } = getSchoolChatReport(slug, { preset: '30d' });

  return (
    <ReportLayout title="Chat audit" subtitle="Flagged messages summary" kpis={kpis} toolbarOptions={{ showClass: false }}>
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={rows}
          keyExtractor={row => row.id}
          columns={[
            { key: 'channel', header: 'Channel', render: row => row.channel },
            { key: 'sender', header: 'Sender', render: row => row.sender },
            { key: 'reason', header: 'Reason', render: row => row.reason },
            { key: 'when', header: 'Flagged', render: row => row.flaggedAt },
            {
              key: 'status',
              header: 'Status',
              render: row => (
                <Badge
                  label={row.status}
                  variant={row.status === 'pending' ? 'warning' : 'neutral'}
                />
              ),
            },
          ]}
        />
      </div>
    </ReportLayout>
  );
}
