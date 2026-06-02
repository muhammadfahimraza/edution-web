'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { FieldVisit } from '@/mocks/adminF10F17.mock';

export const VISIT_SCHOOL_OPTIONS = [
  'Green Valley International',
  'Sunrise Academy',
  'City Model School',
  'Al-Noor High School',
  'Beacon House Campus',
] as const;

export const VISIT_ASSIGNEE_OPTIONS = ['Sara Malik', 'Imran Shah', 'Ayesha Khan'] as const;

export type AddVisitModalProps = {
  open: boolean;
  defaultDate?: string;
  onClose: () => void;
  onSave: (visit: FieldVisit) => void;
};

type VisitFormState = {
  schoolName: string;
  date: string;
  time: string;
  purpose: string;
  assignee: string;
};

const emptyForm = (defaultDate?: string): VisitFormState => ({
  schoolName: VISIT_SCHOOL_OPTIONS[0],
  date: defaultDate ?? '',
  time: '10:00',
  purpose: '',
  assignee: VISIT_ASSIGNEE_OPTIONS[0],
});

export function AddVisitModal({ open, defaultDate, onClose, onSave }: AddVisitModalProps) {
  const [form, setForm] = useState(emptyForm(defaultDate));

  useEffect(() => {
    if (open) setForm(emptyForm(defaultDate));
  }, [open, defaultDate]);

  if (!open) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.date.trim() || !form.purpose.trim()) return;

    onSave({
      id: `v-${Date.now()}`,
      schoolName: form.schoolName,
      date: form.date,
      time: form.time,
      purpose: form.purpose.trim(),
      assignee: form.assignee,
      status: 'scheduled',
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-visit-title"
      onClick={onClose}>
      <form
        onSubmit={handleSubmit}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-lg rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-2xl">
        <h2 id="add-visit-title" className="text-lg font-semibold text-[var(--color-text)]">
          Schedule a field visit
        </h2>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Assign an assessor and purpose for the school visit.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1 sm:col-span-2">
            <label htmlFor="visit-school" className="text-sm font-medium text-[var(--color-text)]">
              School
            </label>
            <select
              id="visit-school"
              value={form.schoolName}
              onChange={e => setForm(f => ({ ...f, schoolName: e.target.value }))}
              className="min-h-12 w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-2 text-base text-[var(--color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)]">
              {VISIT_SCHOOL_OPTIONS.map(name => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Date"
            type="date"
            required
            value={form.date}
            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
          />
          <Input
            label="Time"
            type="time"
            required
            value={form.time}
            onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
          />

          <div className="flex flex-col gap-1 sm:col-span-2">
            <label htmlFor="visit-assignee" className="text-sm font-medium text-[var(--color-text)]">
              Field assessor
            </label>
            <select
              id="visit-assignee"
              value={form.assignee}
              onChange={e => setForm(f => ({ ...f, assignee: e.target.value }))}
              className="min-h-12 w-full rounded-lg border border-[var(--color-border)] bg-white px-4 py-2 text-base text-[var(--color-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)]">
              {VISIT_ASSIGNEE_OPTIONS.map(name => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <Input
              label="Purpose"
              placeholder="e.g. Principal training, onboarding kickoff"
              required
              value={form.purpose}
              onChange={e => setForm(f => ({ ...f, purpose: e.target.value }))}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button type="button" label="Cancel" variant="outline" size="sm" onClick={onClose} />
          <Button type="submit" label="Add visit" size="sm" />
        </div>
      </form>
    </div>
  );
}
