'use client';

import { DataTable } from '@/components/admin/DataTable';
import { ReportLayout } from '@/components/analytics/ReportLayout';
import { ChartCard } from '@/components/charts/ChartCard';
import { LineChart } from '@/components/charts/LineChart';
import { BarChart } from '@/components/charts/BarChart';
import {
  learnUsageTrend,
  mockLearnByClass,
  mockLearnTopics,
} from '@/mocks/principalInsights.mock';

export function PrincipalLearningScreen({ slug: _slug }: { slug: string }) {
  const topicBars = mockLearnTopics.map(t => ({ label: t.subject, value: t.watchHours }));

  return (
    <ReportLayout
      title="Learn & Spotlight"
      subtitle="Curriculum videos and short-form Spotlight usage"
      kpis={[
        { label: 'Total watch hours', value: '1,300', trend: 'up' },
        { label: 'Spotlight views', value: '625', change: 'Last 30 days', trend: 'up' },
        { label: 'Students reached', value: '180', trend: 'up' },
        { label: 'Lowest adoption', value: '48%', change: '10-B', trend: 'down' },
      ]}
    >
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <ChartCard title="Combined usage" subtitle="Curriculum + Spotlight minutes">
          <LineChart data={learnUsageTrend} />
        </ChartCard>
        <ChartCard title="Hours by subject" subtitle="Approved curriculum">
          <BarChart data={topicBars} />
        </ChartCard>
      </div>

      <div className="mb-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={mockLearnTopics}
          keyExtractor={row => row.subject}
          columns={[
            { key: 'subject', header: 'Subject', render: row => <span className="font-medium">{row.subject}</span> },
            { key: 'hours', header: 'Watch hours', render: row => row.watchHours },
            { key: 'students', header: 'Students reached', render: row => row.studentsReached },
          ]}
        />
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold">Adoption by class</h2>
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <DataTable
            data={[...mockLearnByClass].sort((a, b) => a.adoptionPct - b.adoptionPct)}
            keyExtractor={row => row.classSection}
            columns={[
              { key: 'class', header: 'Class', render: row => row.classSection },
              { key: 'curriculum', header: 'Curriculum videos', render: row => row.curriculumVideos },
              { key: 'spotlight', header: 'Spotlight views', render: row => row.spotlightViews },
              { key: 'adoption', header: 'Adoption %', render: row => `${row.adoptionPct}%` },
            ]}
          />
        </div>
      </section>
    </ReportLayout>
  );
}
