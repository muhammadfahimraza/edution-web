'use client';

import { useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { mockSchoolClasses } from '@/mocks/schoolAdminG4G12.mock';

/** G4 — Classes & sections */
export function SchoolAdminClassesScreen() {
  const [classes] = useState(mockSchoolClasses);

  const rows = classes.flatMap(cls =>
    cls.sections.map(sec => ({
      id: sec.id,
      grade: cls.gradeLabel,
      section: sec.name,
      students: sec.studentCount,
      homeroom: sec.homeroomTeacher,
    })),
  );

  return (
    <>
      <AdminPageHeader
        title="Classes & sections"
        subtitle="Grade levels and homeroom sections"
        actions={<Button label="Add class" size="sm" onClick={() => alert('Add class — UI demo.')} />}
      />

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={rows}
          keyExtractor={row => row.id}
          emptyMessage="No classes configured."
          columns={[
            { key: 'grade', header: 'Grade', render: row => <span className="font-medium">{row.grade}</span> },
            { key: 'section', header: 'Section', render: row => row.section },
            { key: 'students', header: 'Students', render: row => row.students },
            { key: 'homeroom', header: 'Homeroom teacher', render: row => row.homeroom },
            {
              key: 'actions',
              header: '',
              render: row => (
                <button type="button" className="text-sm text-[var(--color-primary)] hover:underline" onClick={() => alert(`Edit ${row.grade} ${row.section}`)}>
                  Edit
                </button>
              ),
            },
          ]}
        />
      </div>

      <section className="mt-6 grid gap-4 sm:grid-cols-3">
        {classes.map(cls => (
          <article key={cls.id} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <h3 className="font-semibold">{cls.gradeLabel}</h3>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{cls.sections.length} sections</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {cls.sections.map(s => (
                <Badge key={s.id} label={s.name} variant="neutral" />
              ))}
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
