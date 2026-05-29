'use client';

import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { downloadTextFile } from '@/lib/files/download';
import { mockExportReports } from '@/mocks/principal.mock';

export function PrincipalExportCenterScreen() {
  const { showToast } = useToast();

  const downloadReport = (name: string, format: string) => {
    const content =
      format === 'CSV'
        ? 'metric,value\nattendance,94%\nhomework_completion,87%\n'
        : `Edu Station Report: ${name}\nGenerated: ${new Date().toLocaleString()}\n`;
    const filename = `${name.toLowerCase().replace(/\s+/g, '-')}.${format === 'CSV' ? 'csv' : 'txt'}`;
    downloadTextFile(filename, content, format === 'CSV' ? 'text/csv' : 'text/plain');
    showToast({ title: 'Download started', body: `${name} (${format})` });
  };

  return (
    <>
      <AdminPageHeader title="Export center" subtitle="Download reports for offline analysis" />

      <ul className="flex flex-col gap-3">
        {mockExportReports.map(report => (
          <li
            key={report.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{report.name}</h3>
                <Badge label={report.format} variant="neutral" />
              </div>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{report.description}</p>
              {report.lastGenerated ? (
                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">Last generated: {report.lastGenerated}</p>
              ) : (
                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">Never generated</p>
              )}
            </div>
            <Button
              label="Download"
              size="sm"
              variant="outline"
              onClick={() => downloadReport(report.name, report.format)}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
