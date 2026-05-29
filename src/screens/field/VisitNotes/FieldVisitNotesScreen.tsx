'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { useToast } from '@/components/ui/Toast';
import { readFileAsDataUrl } from '@/lib/files/readImagePreview';
import { getVisitById } from '@/mocks/field.mock';

type VisitPhoto = {
  id: string;
  name: string;
  previewUrl: string;
};

/** J6 — Visit notes + photo upload */
export function FieldVisitNotesScreen({ slug, visitId }: { slug: string; visitId: string }) {
  const router = useRouter();
  const { showToast } = useToast();
  const visit = getVisitById(visitId);
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<VisitPhoto[]>([]);

  if (!visit) return <p className="text-sm text-[var(--color-error)]">Visit not found.</p>;

  const addPhoto = async (file: File) => {
    const previewUrl = await readFileAsDataUrl(file);
    setPhotos(prev => [
      ...prev,
      { id: `${file.name}-${Date.now()}`, name: file.name, previewUrl },
    ]);
  };

  const complete = () => {
    showToast({
      title: 'Visit completed',
      body: `${photos.length} photo(s) queued for sync with field HQ.`,
    });
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
            multiple
            onChange={e => {
              const files = e.target.files;
              if (!files) {
                return;
              }
              Array.from(files).forEach(file => void addPhoto(file));
              e.target.value = '';
            }}
            className="w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--color-primary-light)] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[var(--color-primary-dark)]"
          />
          {photos.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {photos.map(p => (
                <li key={p.id} className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.previewUrl} alt={p.name} className="size-20 rounded-lg object-cover" />
                  <span className="mt-1 block max-w-20 truncate text-[10px] text-[var(--color-text-secondary)]">
                    {p.name}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <Button label="Complete visit" fullWidth className="mt-4" onClick={complete} disabled={!notes.trim()} />
      <Link
        href={`/s/${slug}/field/visits/${visitId}/classes`}
        className="mt-3 block text-center text-sm text-[var(--color-text-secondary)] hover:underline">
        ← Back to classes
      </Link>
    </>
  );
}
