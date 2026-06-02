'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import { downloadCsv } from '@/lib/files/download';
import { parseAnalyticsFilters } from '@/lib/analytics/queryParams';
import { mockExportReports } from '@/mocks/principal.mock';
import {
  getSchoolHomeworkReport,
  getSchoolEngagementReport,
  getSchoolAttendanceReport,
} from '@/mocks/analytics/schoolAnalytics.mock';
import { mockClassLeaderboard } from '@/mocks/principal.mock';
import { mockPrincipalTickets } from '@/mocks/principal.mock';

export function ExportCenterView({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const filters = useMemo(() => parseAnalyticsFilters(searchParams), [searchParams]);

  const generators: Record<string, () => void> = {
    'ex-1': () => {
      const hw = getSchoolHomeworkReport(slug, filters);
      downloadCsv(`homework-completion-${slug}.csv`, [
        ['Class', 'Assigned', 'Submitted', 'Graded', 'Completion %'],
        ...hw.rows.map(r => [
          r.classSection,
          String(r.assigned),
          String(r.submitted),
          String(r.graded),
          String(r.completionPct),
        ]),
      ]);
    },
    'ex-2': () => {
      downloadCsv(`student-roster-${slug}.csv`, [
        ['Student ID', 'Name', 'Class'],
        ['ST-001', 'Fatima Ahmed', '9-A'],
        ['ST-002', 'Omar Khan', '9-A'],
      ]);
    },
    'ex-3': () => {
      const eng = getSchoolEngagementReport(slug, filters);
      downloadCsv(`engagement-${slug}.csv`, [
        ['Class', 'Videos', 'Quizzes', 'Engagement %'],
        ...eng.byClass.map(r => [
          r.classSection,
          String(r.videosWatched),
          String(r.quizAttempts),
          String(r.engagementPct),
        ]),
      ]);
    },
    'ex-4': () => {
      downloadCsv(`leaderboard-${slug}.csv`, [
        ['Rank', 'Name', 'Class', 'Points'],
        ...mockClassLeaderboard.map(r => [
          String(r.rank),
          r.name,
          r.classSection,
          String(r.points),
        ]),
      ]);
    },
    'ex-5': () => {
      downloadCsv(`tickets-${slug}.csv`, [
        ['ID', 'Subject', 'Status', 'Priority', 'Age days'],
        ...mockPrincipalTickets.map(t => [
          t.id,
          t.subject,
          t.status,
          t.priority,
          String(t.ageDays),
        ]),
      ]);
    },
  };

  return (
    <>
      <AdminPageHeader
        title="Export center"
        subtitle="Download CSV reports for your school"
      />
      <ul className="grid gap-4 sm:grid-cols-2">
        {mockExportReports.map(report => (
          <li
            key={report.id}
            className="flex flex-col justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5"
          >
            <div>
              <p className="font-semibold text-[var(--color-text)]">{report.name}</p>
              <p className="mt-1 text-sm text-[var(--color-text-secondary)]">{report.description}</p>
              <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
                Format: {report.format}
                {report.lastGenerated ? ` · Last: ${report.lastGenerated}` : ''}
              </p>
            </div>
            <div className="mt-4">
              {report.format === 'PDF' ? (
                <Button label="PDF — coming soon" size="sm" variant="outline" disabled />
              ) : (
                <Button
                  label={`Download ${report.format}`}
                  size="sm"
                  onClick={() => generators[report.id]?.()}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-[var(--color-text-secondary)]">
        Attendance export: use the Attendance report page filters, then export from there.
      </p>
    </>
  );
}
