'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { AuthShell } from '@/components/layout/AuthShell';
import { OtpInput } from '@/components/forms/OtpInput';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { inferStaffPortalRole, staffPortalPath } from '@/lib/schoolPortal';

const OTP_LENGTH = 6;
const RESEND_SECONDS = 60;
const MOCK_VALID_OTP = '123456';

/**
 * E5 — Staff OTP fallback
 */
export function StaffOtpScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const email = searchParams.get('email') ?? 'you@school.edu.pk';
  const slug = searchParams.get('slug') ?? 'green-valley';

  const [code, setCode] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [resendIn, setResendIn] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (resendIn <= 0) {
      return;
    }
    const id = setInterval(() => setResendIn(s => s - 1), 1000);
    return () => clearInterval(id);
  }, [resendIn]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (code.length < OTP_LENGTH) {
      setError(`Enter the ${OTP_LENGTH}-digit code`);
      return;
    }
    setLoading(true);
    setError(undefined);
    setTimeout(() => {
      setLoading(false);
      if (code === MOCK_VALID_OTP) {
        const role = inferStaffPortalRole(email);
        showToast({
          title: 'Signed in',
          body: `Opening ${role} portal for ${slug}.`,
        });
        router.push(staffPortalPath(slug, role));
        return;
      }
      setError('Invalid code. For demo use 123456');
    }, 700);
  };

  const handleResend = () => {
    if (resendIn > 0) {
      return;
    }
    setResendIn(RESEND_SECONDS);
    setCode('');
    setError(undefined);
    showToast({ title: 'Code resent', body: `A new code was sent to ${email}.` });
  };

  return (
    <AuthShell
      title="Verify your sign-in"
      subtitle={`Enter the code sent to ${email}`}
      backHref="/login"
      backLabel="Change email">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <OtpInput value={code} onChange={setCode} error={error} />
        <Button type="submit" label="Verify" fullWidth loading={loading} />
        <p className="text-center text-sm text-[var(--color-text-secondary)]">
          {resendIn > 0 ? (
            <>Resend code in {resendIn}s</>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="font-medium text-[var(--color-primary)] hover:underline">
              Resend code
            </button>
          )}
        </p>
        <p className="text-center text-sm">
          <Link href="/login" className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)]">
            Back to password sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
