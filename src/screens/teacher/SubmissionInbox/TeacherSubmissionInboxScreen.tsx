'use client';

import { useMemo, useState } from 'react';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { mockSubmissions } from '@/mocks/teacher.mock';
import { cn } from '@/lib/utils';

function SubmissionDetail({
  selected,
  grade,
  feedback,
  setGrade,
  setFeedback,
  saveGrade,
}: {
  selected: (typeof mockSubmissions)[0];
  grade: string;
  feedback: string;
  setGrade: (v: string) => void;
  setFeedback: (v: string) => void;
  saveGrade: () => void;
}) {
  return (
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
  );
}

export function TeacherSubmissionInboxScreen() {
  const { showToast } = useToast();
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [selectedId, setSelectedId] = useState<string | null>(mockSubmissions[0]?.id ?? null);
  const [grade, setGrade] = useState('');
  const [feedback, setFeedback] = useState('');
  const [filter, setFilter] = useState<'pending' | 'all'>('pending');
  const [mobileShowDetail, setMobileShowDetail] = useState(false);

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
    showToast({ title: 'Grade saved', body: `${selected.studentName} marked as graded.` });
    setGrade('');
    setFeedback('');
  };

  const selectSubmission = (id: string) => {
    setSelectedId(id);
    setMobileShowDetail(true);
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

      <div className="flex min-h-[480px] flex-col overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] lg:flex-row">
        <ul
          className={cn(
            'w-full divide-y divide-[var(--color-border)] overflow-y-auto lg:max-w-sm lg:shrink-0 lg:border-r lg:border-[var(--color-border)]',
            mobileShowDetail && 'hidden lg:block',
          )}>
          {filtered.map(sub => (
            <li key={sub.id}>
              <button
                type="button"
                onClick={() => selectSubmission(sub.id)}
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

        <div
          className={cn(
            'flex min-w-0 flex-1 flex-col p-5',
            !mobileShowDetail && 'hidden lg:flex',
          )}>
          {mobileShowDetail ? (
            <button
              type="button"
              className="mb-3 flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] lg:hidden"
              onClick={() => setMobileShowDetail(false)}>
              ← Back to list
            </button>
          ) : null}
          {selected ? (
            <SubmissionDetail
              selected={selected}
              grade={grade}
              feedback={feedback}
              setGrade={setGrade}
              setFeedback={setFeedback}
              saveGrade={saveGrade}
            />
          ) : (
            <p className="text-sm text-[var(--color-text-secondary)]">Select a submission to grade.</p>
          )}
        </div>
      </div>
    </>
  );
}
