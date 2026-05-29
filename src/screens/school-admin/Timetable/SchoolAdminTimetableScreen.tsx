'use client';

import { useState } from 'react';
import { TimetableGrid } from '@/components/admin/TimetableGrid';
import { TimetableSlotModal } from '@/components/admin/TimetableSlotModal';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { useDemoSession } from '@/lib/demo-session/DemoSessionProvider';
import {
  timetableSectionOptions,
  type TimetableCell,
  type TimetableDay,
} from '@/mocks/schoolAdminG4G12.mock';

/** G10 — Timetable editor */
export function SchoolAdminTimetableScreen() {
  const { showToast } = useToast();
  const { getTimetable, patchTimetableCell } = useDemoSession();
  const [section, setSection] = useState(timetableSectionOptions[0] ?? '9-A');
  const [editSlot, setEditSlot] = useState<{
    period: number;
    day: TimetableDay;
    cell: TimetableCell;
  } | null>(null);

  const periods = getTimetable(section);

  const handleCellClick = (period: number, day: TimetableDay, cell: TimetableCell | undefined) => {
    if (!cell) {
      return;
    }
    setEditSlot({ period, day, cell });
  };

  const publish = () => {
    showToast({
      title: 'Timetable published',
      body: `${section} schedule is now visible to teachers and students.`,
    });
  };

  return (
    <>
      <AdminPageHeader
        title="Timetable editor"
        subtitle="Weekly grid by class section"
        actions={<Button label="Publish" size="sm" onClick={publish} />}
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

      {editSlot ? (
        <TimetableSlotModal
          open
          section={section}
          period={editSlot.period}
          day={editSlot.day}
          cell={editSlot.cell}
          onClose={() => setEditSlot(null)}
          onSave={cell => {
            patchTimetableCell(section, editSlot.period, editSlot.day, cell);
            showToast({ title: 'Slot updated', body: `${cell.subject} · ${editSlot.day}` });
          }}
        />
      ) : null}
    </>
  );
}
