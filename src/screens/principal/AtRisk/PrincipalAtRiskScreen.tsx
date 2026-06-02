'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { ReportLayout } from '@/components/analytics/ReportLayout';
import { Badge } from '@/components/ui/Badge';
import { schoolPrincipalBasePath } from '@/lib/schoolPortal';
import { mockAtRiskStudents, type AtRiskReason } from '@/mocks/principalInsights.mock';
import { cn } from '@/lib/utils';

const reasonVariant: Record<AtRiskReason, 'warning' | 'error' | 'accent'> = {
  homework: 'warning',
  attendance: 'error',
  engagement: 'accent',
};

export function PrincipalAtRiskScreen({ slug }: { slug: string }) {
  const base = schoolPrincipalBasePath(slug);
  const [gradeFilter, setGradeFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');
  const [reasonFilter, setReasonFilter] = useState<'all' | AtRiskReason>('all');

  const filtered = useMemo(() => {
    return mockAtRiskStudents.filter(row => {
      if (gradeFilter !== 'all' && row.grade !== gradeFilter) return false;
      if (classFilter !== 'all' && row.classSection !== classFilter) return false;
      if (reasonFilter !== 'all' && !row.reasons.includes(reasonFilter)) return false;
      return true;
    });
  }, [gradeFilter, classFilter, reasonFilter]);

  const grades = ['all', ...new Set(mockAtRiskStudents.map(r => r.grade))];
  const classes = ['all', ...new Set(mockAtRiskStudents.map(r => r.classSection))];

  return (
    <ReportLayout
      title="At-risk students"
      subtitle="Students below homework, attendance, or engagement thresholds"
      kpis={[
        { label: 'Flagged students', value: String(mockAtRiskStudents.length), trend: 'neutral' },
        { label: 'Homework risk', value: String(mockAtRiskStudents.filter(r => r.reasons.includes('homework')).length), trend: 'down' },
        { label: 'Attendance risk', value: String(mockAtRiskStudents.filter(r => r.reasons.includes('attendance')).length), trend: 'down' },
        { label: 'Engagement risk', value: String(mockAtRiskStudents.filter(r => r.reasons.includes('engagement')).length), trend: 'down' },
      ]}
    >
      <div className="mb-4 flex flex-wrap gap-3">
        <FilterSelect label="Grade" value={gradeFilter} options={grades} onChange={setGradeFilter} />
        <FilterSelect label="Class" value={classFilter} options={classes} onChange={setClassFilter} />
        <FilterSelect
          label="Risk type"
          value={reasonFilter}
          options={['all', 'homework', 'attendance', 'engagement']}
          onChange={v => setReasonFilter(v as typeof reasonFilter)}
        />
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={filtered}
          keyExtractor={row => row.id}
          emptyMessage="No students match these filters."
          columns={[
            { key: 'name', header: 'Student', render: row => (
              <div>
                <p className="font-medium">{row.name}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">{row.studentId}</p>
              </div>
            )},
            { key: 'class', header: 'Class', render: row => row.classSection },
            {
              key: 'reasons',
              header: 'Risk',
              render: row => (
                <div className="flex flex-wrap gap-1">
                  {row.reasons.map(r => (
                    <Badge key={r} label={r} variant={reasonVariant[r]} />
                  ))}
                </div>
              ),
            },
            { key: 'detail', header: 'Detail', render: row => <span className="text-sm text-[var(--color-text-secondary)]">{row.detail}</span> },
            {
              key: 'actions',
              header: '',
              render: row => (
                <Link href={`${base}/homework`} className="text-sm text-[var(--color-primary)] hover:underline">
                  Review class
                </Link>
              ),
            },
          ]}
        />
      </div>
    </ReportLayout>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-[var(--color-text-secondary)]">{label}</span>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={cn(
          'min-h-10 rounded-lg border border-[var(--color-border)] bg-white px-3 text-sm',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)]',
        )}>
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt === 'all' ? 'All' : opt}
          </option>
        ))}
      </select>
    </div>
  );
}
