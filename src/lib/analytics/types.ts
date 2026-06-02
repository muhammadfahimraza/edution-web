export type DateRangePreset = '7d' | '30d' | '90d' | 'term' | 'custom';

export type AnalyticsFilters = {
  preset: DateRangePreset;
  from?: string;
  to?: string;
  termId?: string;
  classId?: string;
  grade?: string;
  schoolId?: string;
};

export type ChartPoint = {
  label: string;
  value: number;
};

export type StackedChartPoint = {
  label: string;
  [series: string]: string | number;
};

export type KpiMetric = {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
};

export const defaultFilters: AnalyticsFilters = {
  preset: '30d',
  termId: '2026-spring',
};

export const dateRangePresets: { id: DateRangePreset; label: string }[] = [
  { id: '7d', label: 'Last 7 days' },
  { id: '30d', label: 'Last 30 days' },
  { id: '90d', label: 'Last 90 days' },
  { id: 'term', label: 'Current term' },
];

export const termOptions = [
  { id: '2025-fall', label: 'Fall 2025' },
  { id: '2026-spring', label: 'Spring 2026' },
  { id: '2026-summer', label: 'Summer 2026' },
];

export const classFilterOptions = [
  { id: 'all', label: 'All classes' },
  { id: '9-A', label: '9-A' },
  { id: '9-B', label: '9-B' },
  { id: '10-A', label: '10-A' },
  { id: '10-B', label: '10-B' },
  { id: '11-A', label: '11-A' },
];
