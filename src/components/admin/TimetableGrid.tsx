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

export function TimetableGrid({ periods, className, editable, onCellClick }: TimetableGridProps) {
  return (
    <div className={cn('overflow-x-auto rounded-xl border border-[var(--color-border)]', className)}>
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
                    {cell ? (
                      <button
                        type="button"
                        disabled={!editable && !onCellClick}
                        onClick={() => onCellClick?.(row.period, day, cell)}
                        className={cn(
                          'w-full rounded-lg border border-[var(--color-border)] bg-white p-2 text-left text-xs',
                          (editable || onCellClick) && 'cursor-pointer hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)]/30',
                        )}>
                        <p className="font-semibold text-[var(--color-text)]">{cell.subject}</p>
                        <p className="text-[var(--color-text-secondary)]">{cell.teacher}</p>
                        <p className="text-[var(--color-text-secondary)]">Rm {cell.room}</p>
                      </button>
                    ) : (
                      <div className="min-h-[72px] rounded-lg border border-dashed border-[var(--color-border)] bg-[var(--color-background)]/50" />
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
