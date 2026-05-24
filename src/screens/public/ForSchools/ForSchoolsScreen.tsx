'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AppIcon } from '@/components/ui/AppIcon';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { schoolSizeOptions } from '@/mocks/publicContent.mock';

/**
 * E6 — For schools lead form
 */
export function ForSchoolsScreen() {
  const [schoolName, setSchoolName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [size, setSize] = useState(schoolSizeOptions[1].value);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!schoolName.trim() || !contactName.trim() || !email.includes('@')) {
      setError('School name, contact name, and valid email are required');
      return;
    }
    setLoading(true);
    setError(undefined);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <PublicLayout>
      <div className="mx-auto max-w-2xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Bring Edu Station to your school</h1>
          <p className="mt-3 text-[var(--color-text-secondary)]">
            Share a few details and our team will reach out with a tailored demo — including
            your logo and brand colours.
          </p>
        </div>

        {submitted ? (
          <Card className="flex flex-col gap-4 border-[var(--color-primary)] bg-[var(--color-primary-light)] text-center">
            <div className="flex justify-center" aria-hidden>
              <div className="flex size-12 items-center justify-center rounded-full bg-[var(--color-primary)]">
                <AppIcon name="check" size={24} className="text-white" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-[var(--color-primary-dark)]">
              Thank you, {contactName}!
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)]">
              We received your request for <strong>{schoolName}</strong>. Our team will contact
              you at {email} within 2 business days. (UI demo — no data sent.)
            </p>
            <Link href="/">
              <Button label="Back to home" variant="outline" fullWidth />
            </Link>
          </Card>
        ) : (
          <Card>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Input
                label="School name"
                value={schoolName}
                onChange={e => setSchoolName(e.target.value)}
                placeholder="Green Valley International School"
                required
              />
              <Input
                label="Your name"
                value={contactName}
                onChange={e => setContactName(e.target.value)}
                placeholder="Principal or admin contact"
                required
              />
              <Input
                label="Work email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@school.edu.pk"
                required
              />
              <Input
                label="Phone (optional)"
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+92 300 1234567"
              />
              <div className="flex flex-col gap-1">
                <label htmlFor="school-size" className="text-sm font-medium">
                  School size
                </label>
                <select
                  id="school-size"
                  value={size}
                  onChange={e => setSize(e.target.value)}
                  className="min-h-12 rounded-lg border border-[var(--color-border)] bg-white px-4 py-2 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)]">
                  {schoolSizeOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <Textarea
                label="Anything else? (optional)"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Tell us about your current tools or priorities…"
              />
              {error ? (
                <p className="text-sm text-[var(--color-error)]" role="alert">
                  {error}
                </p>
              ) : null}
              <Button type="submit" label="Request demo" fullWidth loading={loading} />
            </form>
          </Card>
        )}
      </div>
    </PublicLayout>
  );
}
