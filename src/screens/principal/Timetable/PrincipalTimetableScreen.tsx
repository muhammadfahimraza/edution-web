'use client';

import { useState } from 'react';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { TimetableGrid } from '@/components/admin/TimetableGrid';
import {
  mockTimetableBySection,
  timetableSectionOptions,
} from '@/mocks/schoolAdminG4G12.mock';

export function PrincipalTimetableScreen({ slug: _slug }: { slug: string }) {
  const [section, setSection] = useState(timetableSectionOptions[0] ?? '9-A');
  const periods = mockTimetableBySection[section] ?? [];

  return (
    <>
      <AdminPageHeader
        title="Timetable overview"
        subtitle="Read-only weekly schedule by class section"
      />

      <div className="mb-4 max-w-xs">
        <label htmlFor="section-select" className="mb-1 block text-sm font-medium text-[var(--color-text)]">
          Class section
        </label>
        <select
          id="section-select"
          value={section}
          onChange={e => setSection(e.target.value)}
          className="min-h-12 w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-2 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)]">
          {timetableSectionOptions.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <TimetableGrid periods={periods} editable={false} />
      <p className="mt-3 text-xs text-[var(--color-text-secondary)]">
        View only. Contact school admin to edit the timetable.
      </p>
    </>
  );
}
