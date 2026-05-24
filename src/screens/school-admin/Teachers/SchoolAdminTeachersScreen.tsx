'use client';

import { useMemo, useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { mockSchoolTeachers } from '@/mocks/schoolAdminG4G12.mock';

/** G5 — Teachers & assignments */
export function SchoolAdminTeachersScreen() {
  const [teachers] = useState(mockSchoolTeachers);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return teachers;
    return teachers.filter(
      t =>
        t.name.toLowerCase().includes(q) ||
        t.email.toLowerCase().includes(q) ||
        t.subjects.some(s => s.toLowerCase().includes(q)),
    );
  }, [query, teachers]);

  return (
    <>
      <AdminPageHeader
        title="Teachers & assignments"
        subtitle="Staff roster and class assignments"
        actions={<Button label="Invite teacher" size="sm" onClick={() => alert('Invite teacher — UI demo.')} />}
      />

      <div className="mb-4 max-w-md">
        <Input label="Search" placeholder="Name, email, or subject…" value={query} onChange={e => setQuery(e.target.value)} />
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={filtered}
          keyExtractor={row => row.id}
          emptyMessage="No teachers match."
          columns={[
            { key: 'name', header: 'Teacher', render: row => <span className="font-medium">{row.name}</span> },
            { key: 'email', header: 'Email', render: row => row.email },
            { key: 'subjects', header: 'Subjects', render: row => row.subjects.join(', ') },
            { key: 'classes', header: 'Classes', render: row => row.classes.join(', ') },
            {
              key: 'status',
              header: 'Status',
              render: row => (
                <Badge label={row.status} variant={row.status === 'active' ? 'success' : 'warning'} />
              ),
            },
          ]}
        />
      </div>
    </>
  );
}
