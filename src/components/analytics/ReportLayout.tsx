'use client';

import type { ReactNode } from 'react';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { AnalyticsKpiRow } from '@/components/analytics/AnalyticsKpiRow';
import { AnalyticsToolbar } from '@/components/analytics/AnalyticsToolbar';
import { AnalyticsFiltersProvider } from '@/components/analytics/AnalyticsFiltersContext';
import { useAnalyticsFilters } from '@/hooks/useAnalyticsFilters';
import type { KpiMetric } from '@/lib/analytics/types';
import type { AnalyticsToolbarProps } from '@/components/analytics/AnalyticsToolbar';

export type ReportLayoutProps = {
  title: string;
  subtitle?: string;
  kpis: KpiMetric[];
  children: ReactNode;
  onExport?: () => void;
  toolbarOptions?: Partial<AnalyticsToolbarProps>;
  actions?: ReactNode;
};

export function ReportLayout({
  title,
  subtitle,
  kpis,
  children,
  onExport,
  toolbarOptions,
  actions,
}: ReportLayoutProps) {
  const { filters, draft, setDraft, apply, reset, syncDraft } = useAnalyticsFilters();

  return (
    <>
      <AdminPageHeader title={title} subtitle={subtitle} actions={actions} />
      <div className="mb-6">
        <AnalyticsToolbar
          draft={draft}
          onChange={setDraft}
          onApply={() => {
            apply();
          }}
          onReset={() => {
            reset();
            syncDraft();
          }}
          onExport={onExport}
          showTerm
          showClass
          {...toolbarOptions}
        />
        <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
          Active: {filters.preset}
          {filters.classId && filters.classId !== 'all' ? ` · ${filters.classId}` : ''}
          {filters.termId ? ` · ${filters.termId}` : ''}
        </p>
      </div>
      {kpis.length > 0 ? (
        <div className="mb-6">
          <AnalyticsKpiRow metrics={kpis} />
        </div>
      ) : null}
      <AnalyticsFiltersProvider filters={filters}>{children}</AnalyticsFiltersProvider>
    </>
  );
}
