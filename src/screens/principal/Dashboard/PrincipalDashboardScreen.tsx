'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { StatCard } from '@/components/admin/StatCard';
import { ChartCard } from '@/components/charts/ChartCard';
import { LineChart } from '@/components/charts/LineChart';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { AnalyticsToolbar } from '@/components/analytics/AnalyticsToolbar';
import { Badge } from '@/components/ui/Badge';
import { schoolPrincipalBasePath } from '@/lib/schoolPortal';
import { useAnalyticsFilters } from '@/hooks/useAnalyticsFilters';
import { parseAnalyticsFilters } from '@/lib/analytics/queryParams';
import { getSchoolDashboardAnalytics } from '@/mocks/analytics/schoolAnalytics.mock';
import { principalAlerts } from '@/mocks/principal.mock';
import {
  getClassesNeedingAttention,
  getRecentAnnouncementsForDashboard,
  getUpcomingFieldVisit,
} from '@/mocks/principalInsights.mock';
import { cn } from '@/lib/utils';

export function PrincipalDashboardScreen({ slug }: { slug: string }) {
  const base = schoolPrincipalBasePath(slug);
  const searchParams = useSearchParams();
  const filters = useMemo(() => parseAnalyticsFilters(searchParams), [searchParams]);
  const analytics = getSchoolDashboardAnalytics(slug, filters);
  const attention = getClassesNeedingAttention(slug);
  const upcomingVisit = getUpcomingFieldVisit();
  const recentAnnouncements = getRecentAnnouncementsForDashboard();
  const { draft, setDraft, apply, reset, syncDraft } = useAnalyticsFilters();

  return (
    <>
      <AdminPageHeader title="Principal dashboard" subtitle="School KPIs, trends, and alerts" />

      <div className="mb-6">
        <AnalyticsToolbar
          draft={draft}
          onChange={setDraft}
          onApply={apply}
          onReset={() => {
            reset();
            syncDraft();
          }}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {analytics.kpis.map(kpi => (
          <StatCard key={kpi.label} label={kpi.label} value={kpi.value} change={kpi.change} trend={kpi.trend} />
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <ChartCard title="Enrollment" subtitle="Active students">
          <LineChart data={analytics.enrollmentTrend} />
        </ChartCard>
        <ChartCard title="Homework completion" subtitle="Weekly average %">
          <LineChart data={analytics.homeworkTrend} valueFormatter={v => `${v}%`} />
        </ChartCard>
        <ChartCard title="Engagement" subtitle="Quiz attempts trend">
          <LineChart data={analytics.engagementTrend} />
        </ChartCard>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-[var(--color-text)]">Classes needing attention</h2>
            <Link href={`${base}/class-health`} className="text-xs font-medium text-[var(--color-primary)] hover:underline">
              View all
            </Link>
          </div>
          {attention.length === 0 ? (
            <p className="text-sm text-[var(--color-text-secondary)]">All classes are within target ranges.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {attention.map(row => (
                <li
                  key={row.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[var(--color-warning)]/30 bg-[var(--color-warning)]/5 px-3 py-2 text-sm">
                  <span className="font-medium">{row.classSection}</span>
                  <span className="text-xs text-[var(--color-text-secondary)]">
                    HW {row.homeworkPct}% · Att {row.attendancePct}% · Eng {row.engagementPct}%
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="flex flex-col gap-4">
          {upcomingVisit ? (
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-primary-light)]/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-primary)]">
                Upcoming field visit
              </p>
              <p className="mt-1 font-semibold text-[var(--color-text)]">{upcomingVisit.schoolName}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {upcomingVisit.date} · {upcomingVisit.time} · {upcomingVisit.assignee}
              </p>
              <Link href={`${base}/visits`} className="mt-2 inline-block text-sm font-medium text-[var(--color-primary)] hover:underline">
                View assessments
              </Link>
            </div>
          ) : null}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Recent announcements</h2>
              <Link href={`${base}/announcements`} className="text-xs text-[var(--color-primary)] hover:underline">
                Manage
              </Link>
            </div>
            <ul className="flex flex-col gap-2">
              {recentAnnouncements.map(a => (
                <li key={a.id} className="text-sm">
                  <p className="font-medium">{a.title}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {a.audience} · {a.sentAt}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
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

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">Reports & tools</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { href: 'class-health', label: 'Class health', desc: 'Homework, attendance, engagement by class' },
            { href: 'at-risk', label: 'At-risk students', desc: 'Students needing intervention' },
            { href: 'homework', label: 'Homework report', desc: 'Completion by class' },
            { href: 'attendance', label: 'Attendance', desc: 'Present rate trends' },
            { href: 'engagement', label: 'Engagement', desc: 'Videos & quizzes' },
            { href: 'learning', label: 'Learn & Spotlight', desc: 'Curriculum and short-form usage' },
            { href: 'points', label: 'Points & merit', desc: 'Awards and leaderboards' },
            { href: 'timetable', label: 'Timetable', desc: 'Weekly schedule by section' },
            { href: 'parent-engagement', label: 'Parent engagement', desc: 'Family app usage' },
            { href: 'leaderboards', label: 'Leaderboards', desc: 'Term rankings' },
            { href: 'visits', label: 'Visit assessments', desc: 'Field visit summary' },
            { href: 'rewards', label: 'Rewards', desc: 'Redemptions overview' },
            { href: 'chat-audit', label: 'Chat audit', desc: 'Activity and flagged messages' },
            { href: 'export', label: 'Export center', desc: 'CSV downloads' },
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
        </div>
      </section>
    </>
  );
}
