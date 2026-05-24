import Link from 'next/link';

export default function LegalNotFound() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="text-[var(--color-text-secondary)]">
        This legal document does not exist.
      </p>
      <Link href="/legal/privacy" className="font-medium text-[var(--color-primary)] hover:underline">
        View privacy policy
      </Link>
    </div>
  );
}
