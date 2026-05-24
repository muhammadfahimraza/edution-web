'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { inferStaffPortalRole, staffPortalPath } from '@/lib/schoolPortal';
import { AuthShell } from '@/components/layout/AuthShell';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

/**
 * E2 — School staff login
 */
export function StaffLoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [schoolSlug, setSchoolSlug] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Email and password are required');
      return;
    }
    setLoading(true);
    setError(undefined);
    setTimeout(() => {
      setLoading(false);
      if (password === 'otp-demo') {
        router.push(`/login/otp?email=${encodeURIComponent(email)}`);
        return;
      }
      if (email.includes('@') && password.length >= 6) {
        const targetSlug = schoolSlug.trim() || 'green-valley';
        const role = inferStaffPortalRole(email);
        router.push(staffPortalPath(targetSlug, role));
        return;
      }
      setError('Invalid credentials. Demo: any email + password 6+ chars, or password "otp-demo" for OTP flow.');
    }, 700);
  };

  return (
    <AuthShell
      title="Staff sign in"
      subtitle="Teachers, principals, and school administrators">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Work email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@school.edu.pk"
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Input
          label="School slug (optional)"
          value={schoolSlug}
          onChange={e => setSchoolSlug(e.target.value)}
          placeholder="green-valley"
          hint="Optional. Demo: field@… → field; principal@… → principal; teacher@… → teacher"
        />
        {error ? (
          <p className="text-sm text-[var(--color-error)]" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" label="Sign in" fullWidth loading={loading} />
        <div className="flex flex-col gap-2 text-center text-sm">
          <Link href="/login/forgot" className="font-medium text-[var(--color-primary)] hover:underline">
            Forgot password?
          </Link>
          <Link href="/admin/login" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)]">
            Platform admin login →
          </Link>
        </div>
      </form>
    </AuthShell>
  );
}
