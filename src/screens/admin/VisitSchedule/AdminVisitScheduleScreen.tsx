'use client';

import { useMemo, useState } from 'react';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { mockFieldVisits, type FieldVisit } from '@/mocks/adminF10F17.mock';
import { cn } from '@/lib/utils';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstWeekday(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function statusVariant(status: FieldVisit['status']) {
  if (status === 'completed') return 'success' as const;
  if (status === 'cancelled') return 'error' as const;
  return 'primary' as const;
}

/** F12 — Visit schedule */
export function AdminVisitScheduleScreen() {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(4);
  const visits = mockFieldVisits;

  const monthLabel = new Date(year, month, 1).toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const monthPrefix = `${year}-${String(month + 1).padStart(2, '0')}`;

  const visitsByDate = useMemo(() => {
    const map = new Map<string, FieldVisit[]>();
    for (const v of visits) {
      const list = map.get(v.date) ?? [];
      list.push(v);
      map.set(v.date, list);
    }
    return map;
  }, [visits]);

  const daysInMonth = getDaysInMonth(year, month);
  const firstWeekday = getFirstWeekday(year, month);
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1);
  };

  return (
    <>
      <AdminPageHeader title="Visit schedule" subtitle="Field visits to schools — calendar month view" />

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div className="mb-4 flex items-center justify-between">
          <button type="button" onClick={prevMonth} className="rounded-lg px-3 py-1 text-sm hover:bg-[var(--color-background)]">← Prev</button>
          <h2 className="text-lg font-semibold">{monthLabel}</h2>
          <button type="button" onClick={nextMonth} className="rounded-lg px-3 py-1 text-sm hover:bg-[var(--color-background)]">Next →</button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[var(--color-text-secondary)]">
          {WEEKDAYS.map(d => <div key={d} className="py-2">{d}</div>)}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            if (day === null) return <div key={`e-${i}`} className="min-h-20" />;
            const dateKey = `${monthPrefix}-${String(day).padStart(2, '0')}`;
            const dayVisits = visitsByDate.get(dateKey) ?? [];
            return (
              <div key={dateKey} className={cn('min-h-20 rounded-lg border border-[var(--color-border)] bg-white p-1 text-left', dayVisits.length > 0 && 'border-[var(--color-primary)] bg-[var(--color-primary-light)]/30')}>
                <span className="text-xs font-semibold">{day}</span>
                <ul className="mt-1 space-y-0.5">
                  {dayVisits.map(v => (
                    <li key={v.id} className="truncate text-[10px] text-[var(--color-text-secondary)]" title={v.schoolName}>
                      {v.time} {v.schoolName.split(' ')[0]}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <section className="mt-6">
        <h3 className="mb-3 text-sm font-semibold">All visits this month</h3>
        <ul className="flex flex-col gap-2">
          {visits.filter(v => v.date.startsWith(monthPrefix)).map(v => (
            <li key={v.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[var(--color-border)] bg-white px-4 py-3 text-sm">
              <div>
                <p className="font-medium">{v.schoolName}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">{v.date} · {v.time} · {v.purpose} · {v.assignee}</p>
              </div>
              <Badge label={v.status} variant={statusVariant(v.status)} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
