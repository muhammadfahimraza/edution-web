'use client';

import { ChatReportView } from '@/screens/shared/reports/ChatReportView';
import { StatCard } from '@/components/admin/StatCard';
import { getChatActivitySummary } from '@/mocks/principalInsights.mock';

export function PrincipalChatAuditScreen({ slug }: { slug: string }) {
  const summary = getChatActivitySummary();

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h2 className="mb-3 text-lg font-semibold text-[var(--color-text)]">Chat activity</h2>
        <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
          School-wide messaging volume before reviewing flagged content.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Messages / day" value={String(summary.messagesPerDay)} trend="up" />
          <StatCard label="Active channels" value={String(summary.activeChannels)} trend="neutral" />
          <StatCard label="Flagged" value={`${summary.flaggedPct}%`} change="Of all messages" trend="neutral" />
          <StatCard label="Parent messages" value={String(summary.parentMessages)} trend="up" />
        </div>
      </section>
      <ChatReportView slug={slug} />
    </div>
  );
}
