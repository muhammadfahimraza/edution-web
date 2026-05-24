'use client';

import { useMemo, useState } from 'react';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { mockSubmissions } from '@/mocks/teacher.mock';
import { cn } from '@/lib/utils';

export function TeacherSubmissionInboxScreen() {
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [selectedId, setSelectedId] = useState<string | null>(mockSubmissions[0]?.id ?? null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [filter, setFilter] = useState<'pending' | 'all'>('pending');

  const filtered = useMemo(() => {
    if (filter === 'all') return submissions;
    return submissions.filter(s => s.status === 'pending');
  }, [submissions, filter]);

  const selected = submissions.find(s => s.id === selectedId);

  const saveGrade = () => {
    if (!selected) return;
    setSubmissions(prev =>
      prev.map(s =>
        s.id === selected.id ? { ...s, status: 'graded' as const, grade: grade || 'B' } : s,
      ),
    );
    alert('Grade saved (mock).');
    setGrade('');
    setFeedback('');
  };

  return (
    <>
      <AdminPageHeader title="Submission inbox" subtitle="Split list and grader panel" />

      <div className="mb-4 flex gap-2">
        {(['pending', 'all'] as const).map(f => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={
              filter === f
                ? 'rounded-full bg-[var(--color-primary)] px-4 py-1.5 text-sm font-semibold text-white'
                : 'rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-sm font-medium text-[var(--color-text-secondary)]'
            }>
            {f === 'pending' ? 'To grade' : 'All'}
          </button>
        ))}
      </div>

      <div className="flex min-h-[480px] overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <ul className="w-full max-w-sm shrink-0 divide-y divide-[var(--color-border)] overflow-y-auto border-r border-[var(--color-border)]">
          {filtered.map(sub => (
            <li key={sub.id}>
              <button
                type="button"
                onClick={() => setSelectedId(sub.id)}
                className={cn(
                  'w-full px-4 py-3 text-left text-sm hover:bg-[var(--color-background)]',
                  selectedId === sub.id && 'bg-[var(--color-primary-light)]',
                )}>
                <p className="font-medium">{sub.studentName}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">{sub.homeworkTitle}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge label={sub.status} variant={sub.status === 'graded' ? 'success' : 'warning'} />
                  <span className="text-xs text-[var(--color-text-secondary)]">{sub.submittedAt}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>

        <div className="flex min-w-0 flex-1 flex-col p-5">
          {selected ? (
            <>
              <h2 className="text-lg font-semibold">{selected.studentName}</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {selected.homeworkTitle} · {selected.classSection}
              </p>
              <p className="mt-4 rounded-lg bg-[var(--color-background)] p-4 text-sm">{selected.preview}</p>
              {selected.status === 'pending' ? (
                <div className="mt-6 flex max-w-md flex-col gap-3">
                  <Input label="Grade" value={grade} onChange={e => setGrade(e.target.value)} placeholder="A, B+, 85%…" />
                  <Input label="Feedback" value={feedback} onChange={e => setFeedback(e.target.value)} placeholder="Optional comment" />
                  <Button label="Save grade" onClick={saveGrade} />
                </div>
              ) : (
                <p className="mt-4 text-sm font-medium text-[var(--color-success)]">Graded: {selected.grade}</p>
              )}
            </>
          ) : (
            <p className="text-sm text-[var(--color-text-secondary)]">Select a submission to grade.</p>
          )}
        </div>
      </div>
    </>
  );
}
