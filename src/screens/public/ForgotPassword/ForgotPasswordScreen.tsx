'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { AuthShell } from '@/components/layout/AuthShell';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

/**
 * E4 — Forgot password
 */
export function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Enter a valid work email');
      return;
    }
    setLoading(true);
    setError(undefined);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 700);
  };

  return (
    <AuthShell
      title="Reset password"
      subtitle="We will email a reset link to your work address"
      backHref="/login"
      backLabel="Back to sign in">
      {sent ? (
        <Card padded className="flex flex-col gap-4 border-[var(--color-primary)] bg-[var(--color-primary-light)]">
          <p className="font-medium text-[var(--color-primary-dark)]">Check your inbox</p>
          <p className="text-sm text-[var(--color-text-secondary)]">
            If an account exists for <strong>{email}</strong>, you will receive a password
            reset link shortly. (UI demo — no email sent.)
          </p>
          <Link href="/login">
            <Button label="Return to sign in" variant="outline" fullWidth />
          </Link>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Work email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@school.edu.pk"
            error={error}
          />
          <Button type="submit" label="Send reset link" fullWidth loading={loading} />
        </form>
      )}
    </AuthShell>
  );
}
