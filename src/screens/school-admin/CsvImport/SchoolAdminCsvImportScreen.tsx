'use client';

import Link from 'next/link';
import { useState } from 'react';
import { StepIndicator } from '@/components/admin/StepIndicator';
import { DataTable } from '@/components/admin/DataTable';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { parseCsvFile } from '@/lib/files/parseCsv';
import { schoolAdminBasePath } from '@/lib/schoolAdmin';
import { csvImportColumns, type CsvColumnKey } from '@/mocks/schoolAdminG4G12.mock';

const STEPS = [
  { id: 'upload', label: 'Upload' },
  { id: 'map', label: 'Map columns' },
  { id: 'preview', label: 'Preview' },
  { id: 'confirm', label: 'Confirm' },
] as const;

type StepId = (typeof STEPS)[number]['id'];

type CsvRow = Record<string, string>;

const FILE_HEADERS = ['Student ID', 'Full Name', 'Grade', 'Section', 'Parent Phone', 'DOB'];

/** G7 — CSV import wizard */
export function SchoolAdminCsvImportScreen({ slug }: { slug: string }) {
  const { showToast } = useToast();
  const [step, setStep] = useState<StepId>('upload');
  const [fileName, setFileName] = useState<string | null>(null);
  const [parsedRows, setParsedRows] = useState<CsvRow[]>([]);
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

  const previewRows = parsedRows.map(row => ({
    student_id: row[mapping.student_id] ?? row.student_id ?? '',
    full_name: row[mapping.full_name] ?? row.full_name ?? '',
    grade: row[mapping.grade] ?? row.grade ?? '',
    section: row[mapping.section] ?? row.section ?? '',
    parent_phone: row[mapping.parent_phone] ?? row.parent_phone ?? '',
    date_of_birth: row[mapping.date_of_birth] ?? row.date_of_birth ?? '',
  }));

  const handleFile = async (file: File) => {
    setFileName(file.name);
    try {
      const rows = await parseCsvFile(file);
      setParsedRows(rows);
    } catch {
      showToast({
        title: 'Could not read CSV',
        body: 'Check the file format and try again.',
        variant: 'error',
      });
      setFileName(null);
      setParsedRows([]);
    }
  };

  const runImport = () => {
    setImporting(true);
    setTimeout(() => {
      setImporting(false);
      showToast({
        title: 'Import started',
        body: `${previewRows.length} students queued for processing.`,
      });
      setStep('upload');
      setFileName(null);
      setParsedRows([]);
    }, 900);
  };

  return (
    <>
      <AdminPageHeader title="CSV import" subtitle="Upload → map columns → preview → confirm" />

      <StepIndicator steps={[...STEPS]} currentStep={step} />

      <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        {step === 'upload' && (
          <p className="mb-4 text-sm text-[var(--color-text-secondary)]">
            Upload a CSV with student data. Column headers are mapped in the next step.
          </p>
        )}
        {step === 'upload' && (
          <>
            <input
              type="file"
              accept=".csv"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  void handleFile(file);
                }
              }}
              className="text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--color-primary-light)] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[var(--color-primary-dark)]"
            />
            {fileName ? (
              <p className="mt-3 text-sm font-medium">
                Selected: {fileName} ({parsedRows.length} rows)
              </p>
            ) : null}
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
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        )}

        {step === 'preview' && (
          <DataTable
            data={previewRows}
            keyExtractor={row => row.student_id || row.full_name}
            emptyMessage="No rows in file."
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
            <p className="text-sm">
              <strong>{previewRows.length}</strong> students ready to import.
            </p>
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
              Rows with errors will appear in the import errors report.
            </p>
            <Link
              href={`${base}/import-errors`}
              className="mt-2 inline-block text-sm text-[var(--color-primary)] hover:underline">
              View past import errors →
            </Link>
          </>
        )}
      </div>

      <div className="mt-4 flex justify-between">
        <Button
          label="Back"
          variant="outline"
          disabled={stepIndex === 0}
          onClick={() => setStep(STEPS[stepIndex - 1].id)}
        />
        {step === 'confirm' ? (
          <Button label="Confirm import" loading={importing} onClick={runImport} />
        ) : (
          <Button
            label="Next"
            disabled={step === 'upload' && !fileName}
            onClick={() => setStep(STEPS[stepIndex + 1].id)}
          />
        )}
      </div>
    </>
  );
}
