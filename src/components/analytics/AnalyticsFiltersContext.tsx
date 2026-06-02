'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { defaultFilters, type AnalyticsFilters } from '@/lib/analytics/types';

const AnalyticsFiltersContext = createContext<AnalyticsFilters>(defaultFilters);

export function AnalyticsFiltersProvider({
  filters,
  children,
}: {
  filters: AnalyticsFilters;
  children: ReactNode;
}) {
  return (
    <AnalyticsFiltersContext.Provider value={filters}>{children}</AnalyticsFiltersContext.Provider>
  );
}

export function useReportFilters() {
  return useContext(AnalyticsFiltersContext);
}
