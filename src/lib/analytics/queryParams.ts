import type { AnalyticsFilters, DateRangePreset } from './types';
import { defaultFilters } from '@/lib/analytics/types';

const PRESETS: DateRangePreset[] = ['7d', '30d', '90d', 'term', 'custom'];

export function parseAnalyticsFilters(
  searchParams: URLSearchParams | Record<string, string | undefined>,
): AnalyticsFilters {
  const get = (key: string) => {
    if (searchParams instanceof URLSearchParams) return searchParams.get(key) ?? undefined;
    return searchParams[key];
  };

  const presetRaw = get('preset');
  const preset = PRESETS.includes(presetRaw as DateRangePreset)
    ? (presetRaw as DateRangePreset)
    : defaultFilters.preset;

  return {
    preset,
    from: get('from'),
    to: get('to'),
    termId: get('termId') ?? defaultFilters.termId,
    classId: get('classId') ?? 'all',
    grade: get('grade'),
    schoolId: get('schoolId'),
  };
}

export function filtersToSearchParams(filters: AnalyticsFilters): string {
  const params = new URLSearchParams();
  params.set('preset', filters.preset);
  if (filters.from) params.set('from', filters.from);
  if (filters.to) params.set('to', filters.to);
  if (filters.termId) params.set('termId', filters.termId);
  if (filters.classId && filters.classId !== 'all') params.set('classId', filters.classId);
  if (filters.grade) params.set('grade', filters.grade);
  if (filters.schoolId) params.set('schoolId', filters.schoolId);
  return params.toString();
}

/** Demo multiplier so filter changes visibly affect mock KPIs */
export function filterScale(filters: AnalyticsFilters): number {
  const map: Record<DateRangePreset, number> = {
    '7d': 0.85,
    '30d': 1,
    '90d': 1.12,
    term: 1.05,
    custom: 1,
  };
  let scale = map[filters.preset] ?? 1;
  if (filters.classId && filters.classId !== 'all') scale *= 0.42;
  return scale;
}
