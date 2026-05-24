'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { fieldAssessorProfile, mockTodayVisits, type FieldVisit } from '@/mocks/field.mock';
import { cn } from '@/lib/utils';

function statusVariant(status: FieldVisit['status']) {
  if (status === 'completed') return 'success' as const;
  if (status === 'checked_in' || status === 'in_progress') return 'primary' as const;
  return 'neutral' as const;
}

function visitAction(visit: FieldVisit) {
  const base = `/s/${visit.schoolSlug}/field/visits/${visit.id}`;
  if (visit.status === 'completed') return { href: `${base}/notes`, label: 'View notes' };
  if (visit.status === 'checked_in' || visit.status === 'in_progress') {
    return { href: `${base}/classes`, label: 'Continue' };
  }
  return { href: `${base}/check-in`, label: 'Check in' };
}

/** J1 — Today's visits */
export function FieldVisitsScreen({ slug }: { slug: string }) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <>
      <header className="mb-4">
        <h1 className="text-xl font-bold text-[var(--color-text)]">Today&apos;s visits</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {fieldAssessorProfile.name} · {fieldAssessorProfile.region}
        </p>
        <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{today}</p>
      </header>

      <ul className="flex flex-col gap-3">
        {mockTodayVisits.map(visit => {
          const action = visitAction(visit);
          return (
            <li
              key={visit.id}
              className={cn(
                'rounded-xl border bg-[var(--color-surface)] p-4 shadow-sm',
                visit.status === 'completed' ? 'border-[var(--color-border)] opacity-80' : 'border-[var(--color-border)]',
              )}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-[var(--color-text)]">{visit.schoolName}</p>
                  <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{visit.purpose}</p>
                </div>
                <Badge label={visit.status.replace('_', ' ')} variant={statusVariant(visit.status)} />
              </div>
              <dl className="mt-3 space-y-1 text-sm">
                <div className="flex gap-2">
                  <dt className="text-[var(--color-text-secondary)]">Time</dt>
                  <dd>{visit.scheduledTime}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-[var(--color-text-secondary)]">Contact</dt>
                  <dd>{visit.contactName}</dd>
                </div>
                <div>
                  <dt className="text-[var(--color-text-secondary)]">Address</dt>
                  <dd>{visit.address}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-[var(--color-text-secondary)]">Classes</dt>
                  <dd>{visit.classCount}</dd>
                </div>
              </dl>
              <Link href={action.href} className="mt-4 block">
                <Button label={action.label} fullWidth size="sm" variant={visit.status === 'completed' ? 'outline' : 'primary'} />
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
