'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { getVisitById, mockVisitClasses } from '@/mocks/field.mock';

/** J3 — Class list for visit */
export function FieldClassListScreen({ slug, visitId }: { slug: string; visitId: string }) {
  const visit = getVisitById(visitId);
  const classes = mockVisitClasses[visitId] ?? [];

  if (!visit) return <p className="text-sm text-[var(--color-error)]">Visit not found.</p>;

  const assessed = classes.filter(c => c.assessed).length;

  return (
    <>
      <header className="mb-4">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">Classes</p>
        <h1 className="text-xl font-bold">{visit.schoolName}</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {assessed}/{classes.length} classes assessed
        </p>
      </header>

      <ul className="flex flex-col gap-2">
        {classes.map(cls => (
          <li
            key={cls.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <div>
              <p className="font-semibold">{cls.label}</p>
              <p className="text-sm text-[var(--color-text-secondary)]">{cls.studentCount} students</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge label={cls.assessed ? 'Done' : 'Pending'} variant={cls.assessed ? 'success' : 'warning'} />
              {!cls.assessed ? (
                <Link href={`/s/${slug}/field/visits/${visitId}/classes/${cls.id}/assess`}>
                  <Button label="Assess" size="sm" />
                </Link>
              ) : null}
            </div>
          </li>
        ))}
      </ul>

      <Link href={`/s/${slug}/field/visits/${visitId}/notes`} className="mt-6 block">
        <Button label="Finish visit — add notes" fullWidth variant="outline" />
      </Link>
    </>
  );
}
