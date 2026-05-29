'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { HomeworkCard } from '@/components/shared/HomeworkCard';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import { schoolTeacherBasePath } from '@/lib/schoolPortal';
import { mockTeacherHomework, teacherClassOptions } from '@/mocks/teacher.mock';

export function TeacherHomeworkListScreen({ slug }: { slug: string }) {
  const router = useRouter();
  const base = schoolTeacherBasePath(slug);
  const [classFilter, setClassFilter] = useState<string>('all');
  const [homework] = useState(mockTeacherHomework);

  const filtered = useMemo(() => {
    if (classFilter === 'all') return homework;
    return homework.filter(h => h.classSection === classFilter);
  }, [homework, classFilter]);

  return (
    <>
      <AdminPageHeader
        title="Homework by class"
        subtitle="All assignments you created"
        actions={
          <Link href={`${base}/homework/new`}>
            <Button label="Create" size="sm" />
          </Link>
        }
      />

      <div className="mb-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setClassFilter('all')}
          className={
            classFilter === 'all'
              ? 'rounded-full bg-[var(--color-primary)] px-4 py-1.5 text-sm font-semibold text-white'
              : 'rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-sm font-medium text-[var(--color-text-secondary)]'
          }>
          All classes
        </button>
        {teacherClassOptions.map(c => (
          <button
            key={c}
            type="button"
            onClick={() => setClassFilter(c)}
            className={
              classFilter === c
                ? 'rounded-full bg-[var(--color-primary)] px-4 py-1.5 text-sm font-semibold text-white'
                : 'rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-sm font-medium text-[var(--color-text-secondary)]'
            }>
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map(hw => (
          <HomeworkCard
            key={hw.id}
            homework={hw}
            onClick={() => router.push(`${base}/submissions?homework=${hw.id}`)}
          />
        ))}
      </div>
    </>
  );
}
