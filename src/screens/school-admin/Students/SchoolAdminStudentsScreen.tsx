'use client';

import { useMemo, useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { exportStudentsCsv } from '@/lib/files/exportStudentsCsv';
import { mockStudentRoster } from '@/mocks/schoolAdminG4G12.mock';

/** G6 — Student roster */
export function SchoolAdminStudentsScreen() {
  const { showToast } = useToast();
  const [students] = useState(mockStudentRoster);
  const [query, setQuery] = useState('');
  const [classFilter, setClassFilter] = useState<string>('all');

  const classOptions = useMemo(
    () => ['all', ...Array.from(new Set(students.map(s => s.classSection)))],
    [students],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return students.filter(s => {
      if (classFilter !== 'all' && s.classSection !== classFilter) return false;
      if (!q) return true;
      return (
        s.name.toLowerCase().includes(q) ||
        s.studentId.toLowerCase().includes(q) ||
        s.parentPhone.includes(q)
      );
    });
  }, [students, query, classFilter]);

  return (
    <>
      <AdminPageHeader
        title="Student roster"
        subtitle="All enrolled students"
        actions={
          <Button
            label="Export CSV"
            size="sm"
            variant="outline"
            onClick={() => {
              exportStudentsCsv(filtered);
              showToast({
                title: 'Export started',
                body: `Downloaded ${filtered.length} students as CSV.`,
              });
            }}
          />
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="max-w-md flex-1">
          <Input label="Search" placeholder="Name, ID, or phone…" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-2">
          {classOptions.map(c => (
            <button
              key={c}
              type="button"
              onClick={() => setClassFilter(c)}
              className={
                classFilter === c
                  ? 'rounded-full bg-[var(--color-primary)] px-3 py-1.5 text-xs font-semibold text-white'
                  : 'rounded-full border border-[var(--color-border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)]'
              }>
              {c === 'all' ? 'All classes' : c}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={filtered}
          keyExtractor={row => row.id}
          emptyMessage="No students match."
          columns={[
            { key: 'id', header: 'Student ID', render: row => row.studentId },
            { key: 'name', header: 'Name', render: row => <span className="font-medium">{row.name}</span> },
            { key: 'class', header: 'Class', render: row => row.classSection },
            { key: 'phone', header: 'Parent phone', render: row => row.parentPhone },
            {
              key: 'status',
              header: 'Status',
              render: row => (
                <Badge label={row.status} variant={row.status === 'active' ? 'success' : 'neutral'} />
              ),
            },
          ]}
        />
      </div>
    </>
  );
}
