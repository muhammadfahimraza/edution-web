'use client';

import { cn } from '@/lib/utils';
import {
  timetableDays,
  type TimetableCell,
  type TimetableDay,
  type TimetablePeriod,
} from '@/mocks/schoolAdminG4G12.mock';

export type TimetableGridProps = {
  periods: TimetablePeriod[];
  className?: string;
  editable?: boolean;
  onCellClick?: (period: number, day: TimetableDay, cell: TimetableCell | undefined) => void;
};

function PeriodCell({
  cell,
  editable,
  onCellClick,
  period,
  day,
}: {
  cell: TimetableCell | undefined;
  editable?: boolean;
  onCellClick?: TimetableGridProps['onCellClick'];
  period: number;
  day: TimetableDay;
}) {
  if (!cell) {
    return (
      <div className="min-h-[56px] rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-background)]/50" />
    );
  }

  const content = (
    <>
      <p className="font-semibold text-[var(--color-text)]">{cell.subject}</p>
      <p className="text-[var(--color-text-secondary)]">{cell.teacher}</p>
      <p className="text-[var(--color-text-secondary)]">Rm {cell.room}</p>
    </>
  );

  if (editable || onCellClick) {
    return (
      <button
        type="button"
        onClick={() => onCellClick?.(period, day, cell)}
        className="w-full rounded-lg border border-[var(--color-border)] bg-white p-2 text-left text-xs cursor-pointer hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)]/30">
        {content}
      </button>
    );
  }

  return (
    <div className="rounded-lg border border-[var(--color-border)] bg-white p-2 text-xs">
      {content}
    </div>
  );
}

export function TimetableGrid({ periods, className, editable, onCellClick }: TimetableGridProps) {
  return (
    <>
      <div className={cn('flex flex-col gap-4 lg:hidden', className)}>
        {timetableDays.map(day => (
          <section
            key={day}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <h3 className="mb-3 text-sm font-semibold text-[var(--color-text)]">{day}</h3>
            <ul className="space-y-3">
              {periods.map(row => {
                const cell = row.slots[day];
                if (!cell && !editable && !onCellClick) {
                  return null;
                }
                return (
                  <li key={`${day}-${row.period}`} className="border-b border-[var(--color-border)] pb-3 last:border-0 last:pb-0">
                    <p className="mb-1 text-xs font-medium text-[var(--color-text-secondary)]">
                      Period {row.period} · {row.startTime}–{row.endTime}
                    </p>
                    <PeriodCell
                      cell={cell}
                      editable={editable}
                      onCellClick={onCellClick}
                      period={row.period}
                      day={day}
                    />
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <div className={cn('hidden overflow-x-auto rounded-xl border border-[var(--color-border)] lg:block', className)}>
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-background)]">
              <th className="px-3 py-2 text-left font-semibold">Period</th>
              <th className="px-2 py-2 text-left text-xs text-[var(--color-text-secondary)]">Time</th>
              {timetableDays.map(day => (
                <th key={day} className="px-2 py-2 text-center font-semibold">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {periods.map(row => (
              <tr key={row.period} className="border-b border-[var(--color-border)] last:border-0">
                <td className="px-3 py-2 font-medium">{row.period}</td>
                <td className="px-2 py-2 text-xs text-[var(--color-text-secondary)]">
                  {row.startTime}–{row.endTime}
                </td>
                {timetableDays.map(day => {
                  const cell = row.slots[day];
                  return (
                    <td key={day} className="p-1 align-top">
                      <PeriodCell
                        cell={cell}
                        editable={editable}
                        onCellClick={onCellClick}
                        period={row.period}
                        day={day}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
