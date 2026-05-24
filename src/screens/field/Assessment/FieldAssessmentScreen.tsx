'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import {
  assessmentTopics,
  getStudentsForClass,
  getVisitById,
  mockVisitClasses,
  rubricLevels,
} from '@/mocks/field.mock';

/** J4 — Assessment form */
export function FieldAssessmentScreen({
  slug,
  visitId,
  classId,
}: {
  slug: string;
  visitId: string;
  classId: string;
}) {
  const router = useRouter();
  const visit = getVisitById(visitId);
  const cls = mockVisitClasses[visitId]?.find(c => c.id === classId);
  const students = getStudentsForClass(classId);
  const [topic, setTopic] = useState(assessmentTopics[0]);
  const [score, setScore] = useState(4);
  const [studentId, setStudentId] = useState(students[0]?.id ?? '');
  const [notes, setNotes] = useState('');

  if (!visit || !cls) return <p className="text-sm text-[var(--color-error)]">Class not found.</p>;

  const submit = () => {
    const student = students.find(s => s.id === studentId);
    router.push(
      `/s/${slug}/field/visits/${visitId}/points?classId=${classId}&student=${encodeURIComponent(student?.name ?? '')}&topic=${encodeURIComponent(topic)}&score=${score}`,
    );
  };

  return (
    <>
      <header className="mb-4">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">Assessment</p>
        <h1 className="text-xl font-bold">{cls.label}</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">{visit.schoolName}</p>
      </header>

      <div className="flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <div>
          <label htmlFor="topic" className="mb-1 block text-sm font-medium">Topic</label>
          <select
            id="topic"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm">
            {assessmentTopics.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Rubric score</p>
          <div className="flex flex-wrap gap-2">
            {rubricLevels.map(r => (
              <button
                key={r.score}
                type="button"
                onClick={() => setScore(r.score)}
                className={
                  score === r.score
                    ? 'rounded-full bg-[var(--color-primary)] px-3 py-1.5 text-xs font-semibold text-white'
                    : 'rounded-full border border-[var(--color-border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)]'
                }>
                {r.score} · {r.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="student" className="mb-1 block text-sm font-medium">Spotlight student (optional)</label>
          <select
            id="student"
            value={studentId}
            onChange={e => setStudentId(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm">
            {students.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <Textarea label="Observations" value={notes} onChange={e => setNotes(e.target.value)} rows={3} placeholder="Brief notes for this class…" />
      </div>

      <Button label="Continue to points award" fullWidth className="mt-4" onClick={submit} />
    </>
  );
}
