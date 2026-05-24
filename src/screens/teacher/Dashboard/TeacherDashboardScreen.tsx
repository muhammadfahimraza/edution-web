'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import { schoolTeacherBasePath } from '@/lib/schoolPortal';
import { mockTodayClasses, teacherDemoProfile } from '@/mocks/teacher.mock';
import { cn } from '@/lib/utils';

export function TeacherDashboardScreen({ slug }: { slug: string }) {
  const base = schoolTeacherBasePath(slug);

  return (
    <>
      <AdminPageHeader
        title={`Good morning, ${teacherDemoProfile.name.split(' ')[0]}`}
        subtitle={`Today’s classes · ${teacherDemoProfile.classSections.join(', ')}`}
        actions={
          <Link href={`${base}/homework/new`}>
            <Button label="Create homework" size="sm" />
          </Link>
        }
      />

      <section>
        <h2 className="mb-3 text-lg font-semibold">Today’s schedule</h2>
        <ul className="flex flex-col gap-3">
          {mockTodayClasses.map(c => (
            <li
              key={c.id}
              className={cn(
                'flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-[var(--color-surface)] p-4',
                c.isNow ? 'border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]' : 'border-[var(--color-border)]',
              )}>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{c.classSection} — {c.subject}</p>
                  {c.isNow ? <Badge label="Now" variant="primary" /> : null}
                </div>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  {c.time} · Room {c.room}
                </p>
              </div>
              <Link href={`${base}/roster`}>
                <Button label="Roster" size="sm" variant="outline" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 flex flex-wrap gap-2">
        <Link href={`${base}/submissions`}>
          <Button label="Grade submissions" variant="outline" size="sm" />
        </Link>
        <Link href={`${base}/chat`}>
          <Button label="Class chat" variant="outline" size="sm" />
        </Link>
        <Link href={`${base}/timetable`}>
          <Button label="Full timetable" variant="ghost" size="sm" />
        </Link>
      </section>
    </>
  );
}
