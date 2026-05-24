import Link from 'next/link';

export default function FieldNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--color-background)] p-6 text-center">
      <h1 className="text-2xl font-bold text-[var(--color-text)]">School not found</h1>
      <p className="max-w-md text-sm text-[var(--color-text-secondary)]">
        Try{' '}
        <Link href="/s/green-valley/field" className="font-medium text-[var(--color-primary)] hover:underline">
          green-valley
        </Link>
        .
      </p>
      <Link href="/login" className="text-sm font-medium text-[var(--color-primary)] hover:underline">
        ← Back to staff login
      </Link>
    </div>
  );
}
