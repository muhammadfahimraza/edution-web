import type { AnalyticsFilters, ChartPoint, KpiMetric, StackedChartPoint } from '@/lib/analytics/types';
import { filterScale } from '@/lib/analytics/queryParams';
import { formatPercent } from '@/lib/analytics/formatters';
import {
  mockHomeworkCompletion,
  mockEngagementByClass,
  mockEngagementMetrics,
  homeworkCompletionChart,
  engagementChart,
  mockClassLeaderboard,
  mockVisitAssessments,
  mockChatAuditFlags,
  type HomeworkCompletionRow,
  type EngagementByClass,
} from '@/mocks/principal.mock';

function filterByClass<T extends { classSection: string }>(
  rows: T[],
  filters: AnalyticsFilters,
): T[] {
  if (!filters.classId || filters.classId === 'all') return rows;
  return rows.filter(r => r.classSection === filters.classId);
}

export function getSchoolHomeworkReport(_slug: string, filters: AnalyticsFilters) {
  const scale = filterScale(filters);
  const rows = filterByClass(mockHomeworkCompletion, filters).map(r => ({
    ...r,
    completionPct: Math.min(100, Math.round(r.completionPct * scale)),
    submitted: Math.round(r.submitted * scale),
  }));

  const trend: ChartPoint[] = homeworkCompletionChart.map(p => ({
    label: p.month,
    value: Math.min(100, Math.round(p.schools * scale)),
  }));

  const stacked: StackedChartPoint[] = rows.map(r => ({
    label: r.classSection,
    submitted: r.submitted,
    pending: Math.max(0, r.assigned - r.submitted),
  }));

  const avg =
    rows.length > 0
      ? Math.round(rows.reduce((s, r) => s + r.completionPct, 0) / rows.length)
      : 0;

  const kpis: KpiMetric[] = [
    { label: 'Avg completion', value: formatPercent(avg), change: '+4% vs prior period', trend: 'up' },
    { label: 'Assignments', value: String(rows.reduce((s, r) => s + r.assigned, 0)), trend: 'neutral' },
    { label: 'Submitted', value: String(rows.reduce((s, r) => s + r.submitted, 0)), trend: 'up' },
    { label: 'Graded', value: String(rows.reduce((s, r) => s + r.graded, 0)), trend: 'neutral' },
  ];

  return { kpis, trend, stacked, rows };
}

export function getSchoolEngagementReport(_slug: string, filters: AnalyticsFilters) {
  const scale = filterScale(filters);
  const byClass = filterByClass(mockEngagementByClass, filters).map(r => ({
    ...r,
    videosWatched: Math.round(r.videosWatched * scale),
    quizAttempts: Math.round(r.quizAttempts * scale),
    engagementPct: Math.min(100, Math.round(r.engagementPct * scale)),
  }));

  const trend: ChartPoint[] = engagementChart.map(p => ({
    label: p.month,
    value: Math.round(p.schools * scale),
  }));

  const kpis: KpiMetric[] = mockEngagementMetrics.map(m => ({
    label: m.label,
    value: m.value,
    change: m.sublabel,
    trend: 'up' as const,
  }));

  return { kpis, trend, byClass };
}

export type AttendanceRow = {
  id: string;
  classSection: string;
  presentPct: number;
  late: number;
  absent: number;
  enrolled: number;
};

const baseAttendance: AttendanceRow[] = [
  { id: 'att-1', classSection: '9-A', presentPct: 94, late: 3, absent: 2, enrolled: 24 },
  { id: 'att-2', classSection: '9-B', presentPct: 88, late: 5, absent: 4, enrolled: 24 },
  { id: 'att-3', classSection: '10-A', presentPct: 91, late: 4, absent: 3, enrolled: 22 },
  { id: 'att-4', classSection: '10-B', presentPct: 76, late: 8, absent: 9, enrolled: 22 },
  { id: 'att-5', classSection: '11-A', presentPct: 92, late: 2, absent: 3, enrolled: 20 },
];

export function getSchoolAttendanceReport(_slug: string, filters: AnalyticsFilters) {
  const scale = filterScale(filters);
  const rows = filterByClass(baseAttendance, filters).map(r => ({
    ...r,
    presentPct: Math.min(100, Math.round(r.presentPct * scale)),
  }));

  const dailyTrend: ChartPoint[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((label, i) => ({
    label,
    value: Math.min(100, Math.round((88 + i * 2) * scale)),
  }));

  const avg =
    rows.length > 0
      ? Math.round(rows.reduce((s, r) => s + r.presentPct, 0) / rows.length)
      : 0;

  const kpis: KpiMetric[] = [
    { label: 'Present rate', value: formatPercent(avg), trend: 'up' },
    { label: 'Late arrivals', value: String(rows.reduce((s, r) => s + r.late, 0)), trend: 'neutral' },
    { label: 'Absences', value: String(rows.reduce((s, r) => s + r.absent, 0)), trend: 'down' },
    { label: 'Enrolled', value: String(rows.reduce((s, r) => s + r.enrolled, 0)), trend: 'neutral' },
  ];

  return { kpis, dailyTrend, rows };
}

export function getSchoolLeaderboardReport(_slug: string, filters: AnalyticsFilters) {
  const rows = filterByClass(mockClassLeaderboard, filters);
  return { rows, termId: filters.termId ?? '2026-spring' };
}

export function getSchoolVisitsReport(_slug: string, _filters: AnalyticsFilters) {
  return { rows: mockVisitAssessments };
}

export function getSchoolChatReport(_slug: string, _filters: AnalyticsFilters) {
  const pending = mockChatAuditFlags.filter(f => f.status === 'pending').length;
  const kpis: KpiMetric[] = [
    { label: 'Pending review', value: String(pending), trend: pending > 0 ? 'down' : 'up' },
    { label: 'Total flags', value: String(mockChatAuditFlags.length), trend: 'neutral' },
    { label: 'Action taken', value: String(mockChatAuditFlags.filter(f => f.status === 'action_taken').length), trend: 'up' },
    { label: 'Reviewed', value: String(mockChatAuditFlags.filter(f => f.status === 'reviewed').length), trend: 'neutral' },
  ];
  return { kpis, rows: mockChatAuditFlags };
}

export function getSchoolDashboardAnalytics(slug: string, filters: AnalyticsFilters) {
  const hw = getSchoolHomeworkReport(slug, filters);
  const eng = getSchoolEngagementReport(slug, filters);
  const enroll: ChartPoint[] = [
    { label: 'Jan', value: Math.round(420 * filterScale(filters)) },
    { label: 'Feb', value: Math.round(445 * filterScale(filters)) },
    { label: 'Mar', value: Math.round(468 * filterScale(filters)) },
    { label: 'Apr', value: Math.round(490 * filterScale(filters)) },
    { label: 'May', value: Math.round(512 * filterScale(filters)) },
  ];

  const kpis: KpiMetric[] = [
    { label: 'Active students', value: '512', change: '+12 this month', trend: 'up' },
    { label: 'Homework completion', value: hw.kpis[0]?.value ?? '—', trend: 'up' },
    { label: 'Avg engagement', value: '78%', trend: 'up' },
    { label: 'Seat usage', value: '86%', change: '43 / 50 seats', trend: 'neutral' },
  ];

  return {
    kpis,
    enrollmentTrend: enroll,
    homeworkTrend: hw.trend,
    engagementTrend: eng.trend,
  };
}

export type { HomeworkCompletionRow, EngagementByClass };
