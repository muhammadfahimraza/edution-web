import type { AnalyticsFilters, ChartPoint, KpiMetric, StackedChartPoint } from '@/lib/analytics/types';
import { filterScale } from '@/lib/analytics/queryParams';
import { formatCompact, formatPkr } from '@/lib/analytics/formatters';
import { platformKpis, schoolsChartData, mockAdminSchools } from '@/mocks/adminPlatform.mock';
import { mockBillingRows } from '@/mocks/adminF4F9.mock';
import { mockSchoolRankings } from '@/mocks/adminF10F17.mock';
import { mockSmsHealth, smsDeliveryBySchool } from '@/mocks/adminF10F17.mock';

export function getPlatformDashboard(filters: AnalyticsFilters) {
  const scale = filterScale(filters);
  const kpis: KpiMetric[] = [
    ...platformKpis,
    { label: 'Failed SMS (24h)', value: String(Math.round(42 * scale)), change: '-8% vs yesterday', trend: 'down' },
  ];

  const schoolsOnboarded: ChartPoint[] = schoolsChartData.map(p => ({
    label: p.month,
    value: Math.round(p.schools * scale),
  }));

  const homeworkCompletion: ChartPoint[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(
    (label, i) => ({
      label,
      value: Math.min(100, Math.round((72 + i * 3) * scale)),
    }),
  );

  const ticketVolume: StackedChartPoint[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(label => ({
    label,
    high: Math.round(4 * scale),
    medium: Math.round(8 * scale),
    low: Math.round(12 * scale),
  }));

  return { kpis, schoolsOnboarded, homeworkCompletion, ticketVolume };
}

export type PlatformAnalyticsTab = 'overview' | 'schools' | 'learning' | 'support' | 'comms';

export function getPlatformAnalyticsTab(tab: PlatformAnalyticsTab, filters: AnalyticsFilters) {
  const scale = filterScale(filters);

  switch (tab) {
    case 'overview':
      return {
        kpis: [
          { label: 'DAU', value: formatCompact(Math.round(12400 * scale)), trend: 'up' as const },
          { label: 'WAU', value: formatCompact(Math.round(38200 * scale)), trend: 'up' as const },
          { label: 'New signups', value: String(Math.round(340 * scale)), change: 'Last 30 days', trend: 'up' as const },
          { label: 'Sessions', value: formatCompact(Math.round(89000 * scale)), trend: 'neutral' as const },
        ],
        chart: ['W1', 'W2', 'W3', 'W4'].map((label, i) => ({
          label,
          value: Math.round((11000 + i * 400) * scale),
        })) as ChartPoint[],
      };
    case 'schools':
      return {
        kpis: [
          { label: 'Active', value: String(mockAdminSchools.filter(s => s.status === 'active').length), trend: 'neutral' as const },
          { label: 'Trial', value: String(mockAdminSchools.filter(s => s.status === 'trial').length), trend: 'neutral' as const },
          { label: 'Avg seat use', value: '78%', trend: 'up' as const },
          { label: 'Over seat', value: String(mockBillingRows.filter(b => b.overSeat).length), trend: 'down' as const },
        ],
        bar: mockAdminSchools.slice(0, 6).map(s => ({
          label: s.name.slice(0, 12),
          value: Math.round((s.studentCount / s.seatLimit) * 100),
        })) as ChartPoint[],
        donut: [
          { name: 'Active', value: mockAdminSchools.filter(s => s.status === 'active').length },
          { name: 'Trial', value: mockAdminSchools.filter(s => s.status === 'trial').length },
          { name: 'Suspended', value: mockAdminSchools.filter(s => s.status === 'suspended').length },
        ],
      };
    case 'learning':
      return {
        kpis: [
          { label: 'Homework rate', value: '84%', trend: 'up' as const },
          { label: 'Game sessions', value: formatCompact(Math.round(15600 * scale)), trend: 'up' as const },
          { label: 'Spotlight views', value: formatCompact(Math.round(9200 * scale)), trend: 'up' as const },
          { label: 'Quiz pass rate', value: '71%', trend: 'neutral' as const },
        ],
        line: ['Jan', 'Feb', 'Mar', 'Apr', 'May'].map((label, i) => ({
          label,
          value: Math.round((70 + i * 4) * scale),
        })) as ChartPoint[],
        stacked: ['W1', 'W2', 'W3', 'W4'].map(label => ({
          label,
          submitted: Math.round(820 * scale),
          late: Math.round(120 * scale),
          missing: Math.round(80 * scale),
        })) as StackedChartPoint[],
      };
    case 'support':
      return {
        kpis: [
          { label: 'Opened', value: String(Math.round(48 * scale)), trend: 'neutral' as const },
          { label: 'Resolved', value: String(Math.round(41 * scale)), trend: 'up' as const },
          { label: 'Moderation flags', value: String(Math.round(18 * scale)), trend: 'down' as const },
          { label: 'Avg resolution', value: '1.8d', trend: 'up' as const },
        ],
        line: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label, i) => ({
          label,
          value: Math.round((6 + i) * scale),
        })) as ChartPoint[],
      };
    case 'comms':
      return {
        kpis: mockSmsHealth.slice(0, 4).map(m => ({
          label: m.provider,
          value: `${m.successRatePct}%`,
          change: `${m.sent24h} sent`,
          trend: m.status === 'healthy' ? ('up' as const) : ('down' as const),
        })),
        line: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label, i) => ({
          label,
          value: Math.round((96 + (i % 3)) * scale),
        })) as ChartPoint[],
        table: smsDeliveryBySchool,
      };
    default:
      return { kpis: [], line: [] as ChartPoint[] };
  }
}

export function getBillingAnalytics(filters: AnalyticsFilters) {
  const scale = filterScale(filters);
  const totalMrr = mockBillingRows.reduce((s, r) => s + r.mrrPkr, 0);
  const mrrTrend: ChartPoint[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May'].map((label, i) => ({
    label,
    value: Math.round((totalMrr * 0.85 + i * totalMrr * 0.03) * scale),
  }));
  const byPlan: ChartPoint[] = [
    { label: 'Starter', value: mockBillingRows.filter(r => r.plan === 'starter').length },
    { label: 'Growth', value: mockBillingRows.filter(r => r.plan === 'growth').length },
    { label: 'Enterprise', value: mockBillingRows.filter(r => r.plan === 'enterprise').length },
  ];
  return {
    kpis: [
      { label: 'Total MRR', value: formatPkr(Math.round(totalMrr * scale)), change: 'All active plans', trend: 'up' as const },
      { label: 'Over seat', value: String(mockBillingRows.filter(r => r.overSeat).length), change: 'Requires upgrade', trend: 'down' as const },
      { label: 'Overdue', value: String(mockBillingRows.filter(r => r.paymentStatus === 'overdue').length), change: 'Invoices past due', trend: 'down' as const },
    ] satisfies KpiMetric[],
    mrrTrend,
    byPlan,
  };
}

export function getLeaderboardAnalytics(filters: AnalyticsFilters) {
  const term = (filters.termId as keyof typeof mockSchoolRankings) ?? '2026-spring';
  const rows = mockSchoolRankings[term] ?? mockSchoolRankings['2026-spring'];
  const trend: ChartPoint[] = rows.slice(0, 5).map((r, i) => ({
    label: `#${r.rank}`,
    value: r.engagementPct,
  }));
  return { rows, trend };
}

export function getSmsHealthAnalytics(filters: AnalyticsFilters) {
  const scale = filterScale(filters);
  const line: ChartPoint[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label, i) => ({
    label,
    value: Math.min(100, Math.round((97 + (i % 2)) * scale)),
  }));
  return { metrics: mockSmsHealth, line, schools: smsDeliveryBySchool };
}

export function getTicketAnalytics(filters: AnalyticsFilters) {
  const scale = filterScale(filters);
  const volume: ChartPoint[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((label, i) => ({
    label,
    value: Math.round((8 + i * 2) * scale),
  }));
  const age: ChartPoint[] = [
    { label: '<24h', value: Math.round(12 * scale) },
    { label: '24-48h', value: Math.round(6 * scale) },
    { label: '>48h', value: Math.round(4 * scale) },
  ];
  return { volume, age };
}

export const platformSchoolOptions = mockAdminSchools.map(s => ({
  id: s.id,
  label: s.name,
}));
