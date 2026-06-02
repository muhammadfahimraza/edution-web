'use client';

import { Button } from '@/components/ui/Button';
import {
  classFilterOptions,
  dateRangePresets,
  termOptions,
  type AnalyticsFilters,
} from '@/lib/analytics/types';

export type AnalyticsToolbarProps = {
  draft: AnalyticsFilters;
  onChange: (next: AnalyticsFilters) => void;
  onApply: () => void;
  onReset: () => void;
  onExport?: () => void;
  showTerm?: boolean;
  showClass?: boolean;
  showSchool?: boolean;
  schoolOptions?: { id: string; label: string }[];
};

export function AnalyticsToolbar({
  draft,
  onChange,
  onApply,
  onReset,
  onExport,
  showTerm = true,
  showClass = true,
  showSchool = false,
  schoolOptions = [],
}: AnalyticsToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-end">
        <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm md:min-w-[8.75rem] md:max-w-[11rem]">
          <span className="font-medium text-[var(--color-text)]">Date range</span>
          <select
            value={draft.preset}
            onChange={e =>
              onChange({ ...draft, preset: e.target.value as AnalyticsFilters['preset'] })
            }
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm"
          >
            {dateRangePresets.map(p => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </label>

        {showTerm ? (
          <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm md:min-w-[8.75rem] md:max-w-[11rem]">
            <span className="font-medium text-[var(--color-text)]">Term</span>
            <select
              value={draft.termId ?? ''}
              onChange={e => onChange({ ...draft, termId: e.target.value })}
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm"
            >
              {termOptions.map(t => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        {showClass ? (
          <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm md:min-w-[8.75rem] md:max-w-[11rem]">
            <span className="font-medium text-[var(--color-text)]">Class</span>
            <select
              value={draft.classId ?? 'all'}
              onChange={e => onChange({ ...draft, classId: e.target.value })}
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm"
            >
              {classFilterOptions.map(c => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        {showSchool && schoolOptions.length > 0 ? (
          <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm md:min-w-[8.75rem] md:max-w-[11rem]">
            <span className="font-medium text-[var(--color-text)]">School</span>
            <select
              value={draft.schoolId ?? ''}
              onChange={e => onChange({ ...draft, schoolId: e.target.value || undefined })}
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm"
            >
              <option value="">All schools</option>
              {schoolOptions.map(s => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button label="Apply filters" size="sm" onClick={onApply} />
        <Button label="Reset" variant="outline" size="sm" onClick={onReset} />
        {onExport ? (
          <Button label="Export CSV" variant="ghost" size="sm" onClick={onExport} />
        ) : null}
      </div>
    </div>
  );
}
