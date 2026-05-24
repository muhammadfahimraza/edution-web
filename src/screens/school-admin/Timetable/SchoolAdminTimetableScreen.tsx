'use client';

import { useState } from 'react';
import { TimetableGrid } from '@/components/admin/TimetableGrid';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import {
  mockTimetableBySection,
  timetableSectionOptions,
  type TimetableDay,
  type TimetableCell,
} from '@/mocks/schoolAdminG4G12.mock';

/** G10 — Timetable editor */
export function SchoolAdminTimetableScreen() {
  const [section, setSection] = useState(timetableSectionOptions[0] ?? '9-A');
  const periods = mockTimetableBySection[section] ?? [];

  const handleCellClick = (period: number, day: TimetableDay, cell: TimetableCell | undefined) => {
    if (!cell) return;
    alert(`Edit slot — ${section} · Period ${period} · ${day}\n${cell.subject} with ${cell.teacher} (Rm ${cell.room})\nUI demo only.`);
  };

  return (
    <>
      <AdminPageHeader
        title="Timetable editor"
        subtitle="Weekly grid by class section"
        actions={<Button label="Publish" size="sm" onClick={() => alert('Timetable published (mock).')} />}
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {timetableSectionOptions.map(s => (
          <button
            key={s}
            type="button"
            onClick={() => setSection(s)}
            className={
              section === s
                ? 'rounded-full bg-[var(--color-primary)] px-4 py-1.5 text-sm font-semibold text-white'
                : 'rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-sm font-medium text-[var(--color-text-secondary)]'
            }>
            {s}
          </button>
        ))}
      </div>

      <TimetableGrid periods={periods} editable onCellClick={handleCellClick} />
    </>
  );
}
