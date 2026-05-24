'use client';

import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { StepIndicator } from '@/components/admin/StepIndicator';
import { DataTable } from '@/components/admin/DataTable';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import { schoolAdminBasePath } from '@/lib/schoolAdmin';
import { csvImportColumns, csvSampleRows, type CsvColumnKey } from '@/mocks/schoolAdminG4G12.mock';

const STEPS = [
  { id: 'upload', label: 'Upload' },
  { id: 'map', label: 'Map columns' },
  { id: 'preview', label: 'Preview' },
  { id: 'confirm', label: 'Confirm' },
] as const;

type StepId = (typeof STEPS)[number]['id'];

const FILE_HEADERS = ['Student ID', 'Full Name', 'Grade', 'Section', 'Parent Phone', 'DOB'];

/** G7 — CSV import wizard */
export function SchoolAdminCsvImportScreen({ slug }: { slug: string }) {
  const [step, setStep] = useState<StepId>('upload');
  const [fileName, setFileName] = useState<string | null>(null);
  const [mapping, setMapping] = useState<Record<CsvColumnKey, string>>({
    student_id: 'Student ID',
    full_name: 'Full Name',
    grade: 'Grade',
    section: 'Section',
    parent_phone: 'Parent Phone',
    date_of_birth: 'DOB',
  });
  const [importing, setImporting] = useState(false);

  const stepIndex = STEPS.findIndex(s => s.id === step);
  const base = schoolAdminBasePath(slug);

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  };

  const runImport = () => {
    setImporting(true);
    setTimeout(() => {
      setImporting(false);
      alert(`Import started (mock): ${csvSampleRows.length} rows queued.`);
      setStep('upload');
      setFileName(null);
    }, 900);
  };

  return (
    <>
      <AdminPageHeader title="CSV import" subtitle="Upload → map columns → preview → confirm" />

      <StepIndicator steps={[...STEPS]} currentStep={step} />

      <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        {step === 'upload' && (
          <p className="mb-4 text-sm text-[var(--color-text-secondary)]">Upload a CSV with student data. Demo accepts any file.</p>
        )}
        {step === 'upload' && (
          <>
            <input
              type="file"
              accept=".csv"
              onChange={handleFile}
              className="text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--color-primary-light)] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[var(--color-primary-dark)]"
            />
            {fileName ? <p className="mt-3 text-sm font-medium">Selected: {fileName}</p> : null}
          </>
        )}

        {step === 'map' && (
          <div className="grid gap-3 sm:grid-cols-2">
            {csvImportColumns.map(col => (
              <label key={col} className="flex flex-col gap-1 text-sm">
                <span className="font-medium">{col.replace(/_/g, ' ')}</span>
                <select
                  value={mapping[col]}
                  onChange={e => setMapping(prev => ({ ...prev, [col]: e.target.value }))}
                  className="rounded-lg border border-[var(--color-border)] bg-white px-3 py-2">
                  {FILE_HEADERS.map(h => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        )}

        {step === 'preview' && (
          <DataTable
            data={csvSampleRows}
            keyExtractor={row => row.student_id}
            emptyMessage="No rows."
            columns={[
              { key: 'id', header: 'Student ID', render: row => row.student_id },
              { key: 'name', header: 'Name', render: row => row.full_name },
              { key: 'grade', header: 'Grade', render: row => row.grade },
              { key: 'section', header: 'Section', render: row => row.section },
              { key: 'phone', header: 'Parent phone', render: row => row.parent_phone },
            ]}
          />
        )}

        {step === 'confirm' && (
          <>
            <p className="text-sm"><strong>{csvSampleRows.length}</strong> students ready to import.</p>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">Rows with errors will appear in the import errors report.</p>
            <Link href={`${base}/import-errors`} className="mt-2 inline-block text-sm text-[var(--color-primary)] hover:underline">
              View past import errors →
            </Link>
          </>
        )}
      </div>

      <div className="mt-4 flex justify-between">
        <Button label="Back" variant="outline" disabled={stepIndex === 0} onClick={() => setStep(STEPS[stepIndex - 1].id)} />
        {step === 'confirm' ? (
          <Button label="Confirm import" loading={importing} onClick={runImport} />
        ) : (
          <Button label="Next" disabled={step === 'upload' && !fileName} onClick={() => setStep(STEPS[stepIndex + 1].id)} />
        )}
      </div>
    </>
  );
}
