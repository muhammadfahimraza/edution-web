'use client';

import { useMemo, useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Input } from '@/components/ui/Input';
import { mockRosterByClass, teacherClassOptions } from '@/mocks/teacher.mock';

export function TeacherClassRosterScreen() {
  const [classSection, setClassSection] = useState(teacherClassOptions[0]);
  const [query, setQuery] = useState('');

  const roster = mockRosterByClass[classSection] ?? [];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return roster;
    return roster.filter(
      s => s.name.toLowerCase().includes(q) || s.studentId.toLowerCase().includes(q),
    );
  }, [roster, query]);

  return (
    <>
      <AdminPageHeader title="Class roster" subtitle="Students in your classes" />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex flex-wrap gap-2">
          {teacherClassOptions.map(c => (
            <button
              key={c}
              type="button"
              onClick={() => setClassSection(c)}
              className={
                classSection === c
                  ? 'rounded-full bg-[var(--color-primary)] px-4 py-1.5 text-sm font-semibold text-white'
                  : 'rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-sm font-medium text-[var(--color-text-secondary)]'
              }>
              {c}
            </button>
          ))}
        </div>
        <div className="max-w-xs flex-1">
          <Input label="Search" placeholder="Name or ID…" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={filtered}
          keyExtractor={row => row.id}
          emptyMessage="No students."
          columns={[
            { key: 'id', header: 'Student ID', render: row => row.studentId },
            { key: 'name', header: 'Name', render: row => <span className="font-medium">{row.name}</span> },
            { key: 'phone', header: 'Parent phone', render: row => row.parentPhone },
          ]}
        />
      </div>
    </>
  );
}
