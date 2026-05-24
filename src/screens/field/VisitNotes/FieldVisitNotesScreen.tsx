'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { AppIcon } from '@/components/ui/AppIcon';
import { Textarea } from '@/components/ui/Textarea';
import { getVisitById } from '@/mocks/field.mock';

/** J6 — Visit notes + photo upload */
export function FieldVisitNotesScreen({ slug, visitId }: { slug: string; visitId: string }) {
  const router = useRouter();
  const visit = getVisitById(visitId);
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  if (!visit) return <p className="text-sm text-[var(--color-error)]">Visit not found.</p>;

  const addPhoto = () => setPhotos(prev => [...prev, `photo_${prev.length + 1}.jpg`]);

  const complete = () => {
    alert('Visit completed and queued for sync (mock).');
    router.push(`/s/${slug}/field`);
  };

  return (
    <>
      <header className="mb-4">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">Visit notes</p>
        <h1 className="text-xl font-bold">{visit.schoolName}</h1>
      </header>

      <div className="flex flex-col gap-4">
        <Textarea
          label="Summary notes"
          value={notes}
          onChange={e => setNotes(e.target.value)}
          rows={5}
          placeholder="Overall visit observations, follow-ups, principal feedback…"
        />
        <div>
          <p className="mb-2 text-sm font-medium">Photos</p>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={() => addPhoto()}
            className="w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--color-primary-light)] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[var(--color-primary-dark)]"
          />
          {photos.length > 0 ? (
            <ul className="mt-2 flex flex-wrap gap-2">
              {photos.map(p => (
                <li key={p} className="flex items-center gap-2 rounded-lg bg-[var(--color-background)] px-3 py-2 text-xs">
                  <AppIcon name="camera" size={14} className="text-[var(--color-text-secondary)]" />
                  {p}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <Button label="Complete visit" fullWidth className="mt-4" onClick={complete} disabled={!notes.trim()} />
      <Link href={`/s/${slug}/field/visits/${visitId}/classes`} className="mt-3 block text-center text-sm text-[var(--color-text-secondary)] hover:underline">
        ← Back to classes
      </Link>
    </>
  );
}
