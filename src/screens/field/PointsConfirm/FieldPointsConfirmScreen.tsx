'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { defaultPointsAward, getVisitById } from '@/mocks/field.mock';

/** J5 — Points award confirmation */
export function FieldPointsConfirmScreen({ slug, visitId }: { slug: string; visitId: string }) {
  const { showToast } = useToast();
  const router = useRouter();
  const params = useSearchParams();
  const visit = getVisitById(visitId);
  const student = params.get('student') ?? 'Student';
  const topic = params.get('topic') ?? 'Assessment';
  const score = params.get('score') ?? '4';
  const classId = params.get('classId') ?? '';
  const [points, setPoints] = useState(String(defaultPointsAward));

  if (!visit) return <p className="text-sm text-[var(--color-error)]">Visit not found.</p>;

  const confirm = () => {
    showToast({ title: 'Points awarded', body: `${points} points added for ${student} (${topic}).` });
    router.push(`/s/${slug}/field/visits/${visitId}/classes`);
  };

  return (
    <>
      <header className="mb-4">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">Points award</p>
        <h1 className="text-xl font-bold">Confirm merit points</h1>
      </header>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm">
        <dl className="space-y-2">
          <div className="flex justify-between"><dt className="text-[var(--color-text-secondary)]">School</dt><dd>{visit.schoolName}</dd></div>
          <div className="flex justify-between"><dt className="text-[var(--color-text-secondary)]">Student</dt><dd className="font-medium">{student}</dd></div>
          <div className="flex justify-between"><dt className="text-[var(--color-text-secondary)]">Topic</dt><dd>{topic}</dd></div>
          <div className="flex justify-between"><dt className="text-[var(--color-text-secondary)]">Rubric score</dt><dd>{score}/5</dd></div>
        </dl>
      </div>

      <div className="mt-4">
        <Input label="Points to award" type="number" value={points} onChange={e => setPoints(e.target.value)} min={1} max={50} />
      </div>

      <Button label="Confirm & award points" fullWidth className="mt-4" onClick={confirm} />
      <Link
        href={`/s/${slug}/field/visits/${visitId}/classes/${classId}/assess`}
        className="mt-3 block text-center text-sm text-[var(--color-text-secondary)] hover:underline">
        ← Back to assessment
      </Link>
    </>
  );
}
