'use client';

import { useMemo, useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  mockAcademicTerms,
  mockAcademicYears,
  type AcademicYearStatus,
} from '@/mocks/schoolAdminG1G3.mock';

function yearStatusVariant(status: AcademicYearStatus) {
  if (status === 'current') return 'success' as const;
  if (status === 'upcoming') return 'accent' as const;
  return 'neutral' as const;
}

/** G3 — Academic years / terms */
export function SchoolAdminAcademicYearsScreen() {
  const [years, setYears] = useState(mockAcademicYears);
  const [terms, setTerms] = useState(mockAcademicTerms);
  const [selectedYearId, setSelectedYearId] = useState<string>('ay-2026');

  const selectedYear = years.find(y => y.id === selectedYearId);
  const yearTerms = useMemo(
    () => terms.filter(t => t.yearId === selectedYearId),
    [terms, selectedYearId],
  );

  const setCurrentTerm = (termId: string) => {
    setTerms(prev => prev.map(t => ({ ...t, isCurrent: t.id === termId })));
  };

  const setCurrentYear = (yearId: string) => {
    setYears(prev =>
      prev.map(y => ({
        ...y,
        status: y.id === yearId ? ('current' as AcademicYearStatus) : y.status === 'current' ? 'archived' : y.status,
      })),
    );
    setSelectedYearId(yearId);
  };

  return (
    <>
      <AdminPageHeader
        title="Academic years & terms"
        subtitle="Define school calendar periods for homework, timetables, and reports"
        actions={<Button label="Add year" size="sm" onClick={() => alert('Add academic year — UI demo.')} />}
      />

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={years}
          keyExtractor={row => row.id}
          emptyMessage="No academic years."
          columns={[
            {
              key: 'label',
              header: 'Year',
              render: row => (
                <button
                  type="button"
                  className="text-left font-medium text-[var(--color-primary)] hover:underline"
                  onClick={() => setSelectedYearId(row.id)}>
                  {row.label}
                </button>
              ),
            },
            { key: 'dates', header: 'Dates', render: row => `${row.startDate} – ${row.endDate}` },
            {
              key: 'status',
              header: 'Status',
              render: row => <Badge label={row.status} variant={yearStatusVariant(row.status)} />,
            },
            {
              key: 'terms',
              header: 'Terms',
              render: row => terms.filter(t => t.yearId === row.id).length,
            },
            {
              key: 'actions',
              header: '',
              render: row =>
                row.status !== 'current' ? (
                  <button
                    type="button"
                    className="text-sm text-[var(--color-primary)] hover:underline"
                    onClick={() => setCurrentYear(row.id)}>
                    Set current
                  </button>
                ) : (
                  <span className="text-xs text-[var(--color-text-secondary)]">Active</span>
                ),
            },
          ]}
        />
      </div>

      <section className="mt-8">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold">Terms — {selectedYear?.label ?? 'Select a year'}</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">One term should be marked as current</p>
          </div>
          <Button label="Add term" size="sm" variant="outline" onClick={() => alert('Add term — UI demo.')} />
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <DataTable
            data={yearTerms}
            keyExtractor={row => row.id}
            emptyMessage="No terms for this year."
            columns={[
              { key: 'name', header: 'Term', render: row => <span className="font-medium">{row.name}</span> },
              { key: 'dates', header: 'Dates', render: row => `${row.startDate} – ${row.endDate}` },
              {
                key: 'current',
                header: 'Current',
                render: row =>
                  row.isCurrent ? (
                    <Badge label="Current" variant="success" />
                  ) : (
                    <button
                      type="button"
                      className="text-sm text-[var(--color-primary)] hover:underline"
                      onClick={() => setCurrentTerm(row.id)}>
                      Set current
                    </button>
                  ),
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
