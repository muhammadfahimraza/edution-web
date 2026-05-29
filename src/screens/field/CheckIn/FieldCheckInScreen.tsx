'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { getVisitById } from '@/mocks/field.mock';

/** J2 — School check-in */
export function FieldCheckInScreen({ slug, visitId }: { slug: string; visitId: string }) {
  const { showToast } = useToast();
  const router = useRouter();
  const visit = getVisitById(visitId);
  const [gpsConfirmed, setGpsConfirmed] = useState(false);
  const [contactMet, setContactMet] = useState(false);

  if (!visit) {
    return <p className="text-sm text-[var(--color-error)]">Visit not found.</p>;
  }

  const checkIn = () => {
    if (!gpsConfirmed || !contactMet) {
      showToast({
        title: 'Check-in incomplete',
        body: 'Confirm GPS and contact before check-in.',
        variant: 'error',
      });
      return;
    }
    router.push(`/s/${slug}/field/visits/${visitId}/classes`);
  };

  return (
    <>
      <header className="mb-4">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-secondary)]">Check-in</p>
        <h1 className="text-xl font-bold">{visit.schoolName}</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">{visit.address}</p>
      </header>

      <div className="flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
        <Input label="Scheduled time" value={visit.scheduledTime} readOnly disabled />
        <Input label="Contact on site" value={visit.contactName} readOnly disabled />
        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" checked={gpsConfirmed} onChange={e => setGpsConfirmed(e.target.checked)} className="size-5" />
          I am at the school location (GPS mock confirmed)
        </label>
        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" checked={contactMet} onChange={e => setContactMet(e.target.checked)} className="size-5" />
          Met with {visit.contactName}
        </label>
      </div>

      <Button label="Check in & start visit" fullWidth className="mt-4" onClick={checkIn} />
      <Link href={`/s/${slug}/field`} className="mt-3 block text-center text-sm text-[var(--color-text-secondary)] hover:underline">
        Cancel
      </Link>
    </>
  );
}
