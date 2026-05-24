'use client';

import { useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { SideDrawer } from '@/components/admin/SideDrawer';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { mockParentPhoneExceptions } from '@/mocks/schoolAdminG4G12.mock';

function reasonLabel(reason: string) {
  if (reason === 'invalid_format') return 'Invalid format';
  if (reason === 'duplicate') return 'Duplicate phone';
  return 'Not found';
}

/** G9 — Parent-phone exceptions */
export function SchoolAdminParentExceptionsScreen() {
  const [rows, setRows] = useState(mockParentPhoneExceptions);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [correctedPhone, setCorrectedPhone] = useState('');

  const selected = rows.find(r => r.id === selectedId);

  const resolve = () => {
    if (!selected) return;
    setRows(prev => prev.map(r => (r.id === selected.id ? { ...r, status: 'resolved' as const } : r)));
    setSelectedId(null);
    setCorrectedPhone('');
  };

  return (
    <>
      <AdminPageHeader
        title="Parent-phone exceptions"
        subtitle="Students whose parent phone could not be linked automatically"
      />

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={rows}
          keyExtractor={row => row.id}
          emptyMessage="No exceptions."
          columns={[
            {
              key: 'student',
              header: 'Student',
              render: row => (
                <button type="button" className="text-left font-medium text-[var(--color-primary)] hover:underline" onClick={() => { setSelectedId(row.id); setCorrectedPhone(row.attemptedPhone); }}>
                  {row.studentName}
                </button>
              ),
            },
            { key: 'id', header: 'Student ID', render: row => row.studentId },
            { key: 'class', header: 'Class', render: row => row.classSection },
            { key: 'phone', header: 'Attempted phone', render: row => row.attemptedPhone },
            { key: 'reason', header: 'Reason', render: row => reasonLabel(row.reason) },
            {
              key: 'status',
              header: 'Status',
              render: row => <Badge label={row.status} variant={row.status === 'pending' ? 'warning' : 'success'} />,
            },
          ]}
        />
      </div>

      <SideDrawer
        open={!!selected}
        onClose={() => setSelectedId(null)}
        title="Resolve exception"
        subtitle={selected?.studentName}
        footer={
          selected?.status === 'pending' ? (
            <Button label="Save & resolve" fullWidth onClick={resolve} disabled={!correctedPhone.trim()} />
          ) : undefined
        }>
        {selected ? (
          <div className="flex flex-col gap-4 text-sm">
            <p className="text-[var(--color-text-secondary)]">Issue: {reasonLabel(selected.reason)}</p>
            <Input label="Corrected parent phone" value={correctedPhone} onChange={e => setCorrectedPhone(e.target.value)} placeholder="+92 300 1234567" />
          </div>
        ) : null}
      </SideDrawer>
    </>
  );
}
