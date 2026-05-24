'use client';

import { DataTable } from '@/components/admin/DataTable';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { mockImportErrors } from '@/mocks/schoolAdminG4G12.mock';

/** G8 — Import errors report */
export function SchoolAdminImportErrorsScreen() {
  return (
    <>
      <AdminPageHeader
        title="Import errors"
        subtitle="Failed rows from recent CSV imports"
      />

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={mockImportErrors}
          keyExtractor={row => row.id}
          emptyMessage="No import errors."
          columns={[
            { key: 'batch', header: 'Import', render: row => row.importBatch },
            { key: 'row', header: 'Row #', render: row => row.rowNumber },
            { key: 'field', header: 'Field', render: row => <Badge label={row.field} variant="neutral" /> },
            { key: 'value', header: 'Value', render: row => row.value || '—' },
            { key: 'error', header: 'Error', render: row => <span className="text-[var(--color-error)]">{row.error}</span> },
          ]}
        />
      </div>
    </>
  );
}
