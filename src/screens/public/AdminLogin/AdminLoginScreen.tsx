'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { AuthShell } from '@/components/layout/AuthShell';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

/**
 * E3 — Platform super-admin login (stricter/darker header)
 */
export function AdminLoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      if (email.includes('@') && password.length >= 8) {
        router.push('/admin');
        return;
      }
      setError('Invalid credentials. Demo: any email + password 8+ characters.');
    }, 700);
  };

  return (
    <AuthShell
      variant="admin"
      title="Platform admin"
      subtitle="Edu Station internal access only">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label="Admin email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="admin@edustation.pk"
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error ? (
          <p className="text-sm text-[var(--color-error)]" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" label="Sign in to admin" fullWidth loading={loading} />
        <p className="text-center text-sm text-[var(--color-text-secondary)]">
          <Link href="/login" className="font-medium text-[var(--color-primary)] hover:underline">
            ← School staff login
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
