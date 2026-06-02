'use client';

import { useMemo, useState } from 'react';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AppIcon } from '@/components/ui/AppIcon';
import { useToast } from '@/components/ui/Toast';
import { mockFieldVisits, type FieldVisit } from '@/mocks/adminF10F17.mock';
import { cn } from '@/lib/utils';
import { AddVisitModal } from './AddVisitModal';

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

function statusDotClass(status: FieldVisit['status']) {
  if (status === 'completed') return 'bg-emerald-500';
  if (status === 'cancelled') return 'bg-[var(--color-text-secondary)]/50';
  return 'bg-[var(--color-primary)]';
}

function isSameDay(a: Date, y: number, m: number, d: number) {
  return a.getFullYear() === y && a.getMonth() === m && a.getDate() === d;
}

/** F12 — Visit schedule */
export function AdminVisitScheduleScreen() {
  const { showToast } = useToast();
  const today = useMemo(() => new Date(), []);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [visits, setVisits] = useState<FieldVisit[]>(mockFieldVisits);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [addDefaultDate, setAddDefaultDate] = useState<string | undefined>();

  const monthLabel = new Date(year, month, 1).toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });
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

  const monthVisits = useMemo(
    () => visits.filter(v => v.date.startsWith(monthPrefix)).sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time)),
    [visits, monthPrefix],
  );

  const filteredList = useMemo(() => {
    if (!selectedDate) return monthVisits;
    return monthVisits.filter(v => v.date === selectedDate);
  }, [monthVisits, selectedDate]);

  const monthStats = useMemo(() => {
    const scheduled = monthVisits.filter(v => v.status === 'scheduled').length;
    const completed = monthVisits.filter(v => v.status === 'completed').length;
    const cancelled = monthVisits.filter(v => v.status === 'cancelled').length;
    return { total: monthVisits.length, scheduled, completed, cancelled };
  }, [monthVisits]);

  const daysInMonth = getDaysInMonth(year, month);
  const firstWeekday = getFirstWeekday(year, month);
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const prevMonth = () => {
    setSelectedDate(null);
    if (month === 0) {
      setMonth(11);
      setYear(y => y - 1);
    } else setMonth(m => m - 1);
  };
  const nextMonth = () => {
    setSelectedDate(null);
    if (month === 11) {
      setMonth(0);
      setYear(y => y + 1);
    } else setMonth(m => m + 1);
  };

  const openAddVisit = (dateKey?: string) => {
    setAddDefaultDate(dateKey);
    setAddOpen(true);
  };

  const handleAddVisit = (visit: FieldVisit) => {
    setVisits(prev => [...prev, visit]);
    const [y, m] = visit.date.split('-').map(Number);
    if (y && m) {
      setYear(y);
      setMonth(m - 1);
    }
    setSelectedDate(visit.date);
    showToast({
      title: 'Visit scheduled',
      body: `${visit.schoolName} on ${visit.date} at ${visit.time}`,
    });
  };

  return (
    <>
      <AdminPageHeader
        title="Visit schedule"
        subtitle="Plan and track field assessor visits across schools"
        actions={<Button label="Add visit" size="sm" onClick={() => openAddVisit()} />}
      />

      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'This month', value: monthStats.total, icon: 'calendar' as const },
          { label: 'Scheduled', value: monthStats.scheduled, icon: 'target' as const },
          { label: 'Completed', value: monthStats.completed, icon: 'check' as const },
          { label: 'Cancelled', value: monthStats.cancelled, icon: 'alertTriangle' as const },
        ].map(stat => (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 shadow-sm">
            <span className="flex size-10 items-center justify-center rounded-lg bg-[var(--color-primary-light)] text-[var(--color-primary)]">
              <AppIcon name={stat.icon} size={20} />
            </span>
            <div>
              <p className="text-2xl font-bold tabular-nums text-[var(--color-text)]">{stat.value}</p>
              <p className="text-xs font-medium text-[var(--color-text-secondary)]">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <section className="hidden overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-sm md:block">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] bg-gradient-to-r from-[var(--color-primary-light)] to-white px-4 py-4 sm:px-5">
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white">
                <AppIcon name="calendarDays" size={18} className="text-white" />
              </span>
              <h2 className="text-lg font-semibold text-[var(--color-text)]">{monthLabel}</h2>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prevMonth}
                className="rounded-lg border border-[var(--color-border)] bg-white p-2 text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                aria-label="Previous month">
                <span className="text-sm font-semibold">‹</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setYear(today.getFullYear());
                  setMonth(today.getMonth());
                  setSelectedDate(null);
                }}
                className="rounded-lg px-3 py-2 text-xs font-semibold text-[var(--color-primary)] hover:bg-white/80">
                Today
              </button>
              <button
                type="button"
                onClick={nextMonth}
                className="rounded-lg border border-[var(--color-border)] bg-white p-2 text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                aria-label="Next month">
                <span className="text-sm font-semibold">›</span>
              </button>
            </div>
          </div>

          <div className="p-3 sm:p-4">
            <div className="mb-2 grid grid-cols-7 gap-1.5 text-center text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
              {WEEKDAYS.map(d => (
                <div key={d} className="py-2">
                  {d}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {cells.map((day, i) => {
                if (day === null) return <div key={`e-${i}`} className="min-h-[5.5rem]" />;
                const dateKey = `${monthPrefix}-${String(day).padStart(2, '0')}`;
                const dayVisits = visitsByDate.get(dateKey) ?? [];
                const isToday = isSameDay(today, year, month, day);
                const isSelected = selectedDate === dateKey;

                return (
                  <button
                    key={dateKey}
                    type="button"
                    onClick={() => setSelectedDate(current => (current === dateKey ? null : dateKey))}
                    onDoubleClick={() => openAddVisit(dateKey)}
                    className={cn(
                      'group flex min-h-[5.5rem] flex-col rounded-xl border p-2 text-left transition-all',
                      'hover:border-[var(--color-primary)]/50 hover:shadow-md',
                      isSelected
                        ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]/50 ring-2 ring-[var(--color-primary)]/25'
                        : dayVisits.length > 0
                          ? 'border-[var(--color-primary)]/30 bg-[var(--color-primary-light)]/20'
                          : 'border-[var(--color-border)] bg-[var(--color-background)]',
                      isToday && !isSelected && 'ring-2 ring-[var(--color-primary)]/40',
                    )}>
                    <span
                      className={cn(
                        'inline-flex size-7 items-center justify-center rounded-full text-xs font-bold',
                        isToday ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-text)]',
                      )}>
                      {day}
                    </span>
                    <ul className="mt-1 flex flex-1 flex-col gap-1 overflow-hidden">
                      {dayVisits.slice(0, 2).map(v => (
                        <li
                          key={v.id}
                          className="flex items-center gap-1 truncate rounded-md bg-white/80 px-1.5 py-0.5 text-[10px] font-medium text-[var(--color-text)] shadow-sm"
                          title={`${v.time} · ${v.schoolName}`}>
                          <span className={cn('size-1.5 shrink-0 rounded-full', statusDotClass(v.status))} />
                          <span className="truncate">{v.time}</span>
                        </li>
                      ))}
                      {dayVisits.length > 2 ? (
                        <li className="text-[10px] font-medium text-[var(--color-primary)]">
                          +{dayVisits.length - 2} more
                        </li>
                      ) : null}
                    </ul>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-[var(--color-border)] pt-3 text-xs text-[var(--color-text-secondary)]">
              <span className="font-medium text-[var(--color-text)]">Legend</span>
              {(
                [
                  ['scheduled', 'Scheduled', 'bg-[var(--color-primary)]'],
                  ['completed', 'Completed', 'bg-emerald-500'],
                  ['cancelled', 'Cancelled', 'bg-[var(--color-text-secondary)]/50'],
                ] as const
              ).map(([, label, dot]) => (
                <span key={label} className="inline-flex items-center gap-1.5">
                  <span className={cn('size-2 rounded-full', dot)} />
                  {label}
                </span>
              ))}
              <span className="text-[var(--color-text-secondary)]">· Double-click a day to add a visit</span>
            </div>
          </div>
        </section>

        <section className="flex flex-col rounded-2xl border border-[var(--color-border)] bg-white shadow-sm">
          <div className="flex items-center justify-between gap-2 border-b border-[var(--color-border)] px-4 py-3 md:hidden">
            <button type="button" onClick={prevMonth} className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm" aria-label="Previous month">
              ‹
            </button>
            <div className="text-center">
              <p className="text-sm font-semibold">{monthLabel}</p>
              <button type="button" onClick={() => openAddVisit()} className="text-xs font-medium text-[var(--color-primary)]">
                + Add visit
              </button>
            </div>
            <button type="button" onClick={nextMonth} className="rounded-lg border border-[var(--color-border)] px-3 py-2 text-sm" aria-label="Next month">
              ›
            </button>
          </div>
          <header className="flex items-center justify-between gap-2 border-b border-[var(--color-border)] px-4 py-4">
            <div>
              <h3 className="text-sm font-semibold text-[var(--color-text)]">
                {selectedDate
                  ? new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })
                  : 'All visits this month'}
              </h3>
              <p className="text-xs text-[var(--color-text-secondary)]">
                {filteredList.length} visit{filteredList.length === 1 ? '' : 's'}
              </p>
            </div>
            <Button
              label="Add"
              size="sm"
              variant="outline"
              onClick={() => openAddVisit(selectedDate ?? undefined)}
            />
          </header>

          <ul className="flex max-h-[32rem] flex-1 flex-col gap-2 overflow-y-auto p-3">
            {filteredList.length === 0 ? (
              <li className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                <span className="flex size-12 items-center justify-center rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)]">
                  <AppIcon name="calendar" size={24} />
                </span>
                <p className="text-sm font-medium text-[var(--color-text)]">No visits yet</p>
                <p className="max-w-xs text-xs text-[var(--color-text-secondary)]">
                  Schedule a field visit for {selectedDate ? 'this day' : 'this month'}.
                </p>
                <Button label="Schedule visit" size="sm" onClick={() => openAddVisit(selectedDate ?? undefined)} />
              </li>
            ) : (
              filteredList.map(v => (
                <li
                  key={v.id}
                  className={cn(
                    'rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-3 text-sm transition-shadow hover:shadow-md',
                    v.status === 'scheduled' && 'border-l-4 border-l-[var(--color-primary)]',
                    v.status === 'completed' && 'border-l-4 border-l-emerald-500',
                    v.status === 'cancelled' && 'border-l-4 border-l-[var(--color-text-secondary)]/40',
                  )}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-[var(--color-text)]">{v.schoolName}</p>
                      <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                        {v.date} · {v.time}
                      </p>
                    </div>
                    <Badge label={v.status} variant={statusVariant(v.status)} />
                  </div>
                  <p className="mt-2 text-xs text-[var(--color-text)]">{v.purpose}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-[var(--color-text-secondary)]">
                    <AppIcon name="user" size={14} />
                    {v.assignee}
                  </p>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>

      <AddVisitModal
        open={addOpen}
        defaultDate={addDefaultDate}
        onClose={() => setAddOpen(false)}
        onSave={handleAddVisit}
      />
    </>
  );
}
