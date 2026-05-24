import Link from 'next/link';
import { EduStationLogo } from '@/components/brand/EduStationLogo';
import { Card } from '@/components/ui/Card';

export type AuthShellProps = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  variant?: 'default' | 'admin';
  backHref?: string;
  backLabel?: string;
};

export function AuthShell({
  children,
  title,
  subtitle,
  variant = 'default',
  backHref,
  backLabel = 'Back',
}: AuthShellProps) {
  const isAdmin = variant === 'admin';

  return (
    <div className="flex min-h-full flex-col">
      <header
        className={
          isAdmin
            ? 'border-b border-white/10 bg-[#1A1D21] px-4 py-6 md:px-6'
            : 'border-b border-[var(--color-border)] bg-white px-4 py-6 md:px-6'
        }>
        <div className="mx-auto flex max-w-md items-center justify-between gap-4">
          <Link href="/">
            <EduStationLogo size={40} showWordmark />
          </Link>
          {isAdmin ? (
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/80">
              Platform admin
            </span>
          ) : null}
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10 md:px-6">
        <div className="w-full max-w-md">
          {backHref ? (
            <Link
              href={backHref}
              className="mb-4 inline-block text-sm font-medium text-[var(--color-primary)] hover:underline">
              ← {backLabel}
            </Link>
          ) : null}

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[var(--color-text)]">{title}</h1>
            {subtitle ? (
              <p className="mt-2 text-sm text-[var(--color-text-secondary)]">{subtitle}</p>
            ) : null}
          </div>

          <Card className="shadow-sm">{children}</Card>
        </div>
      </main>
    </div>
  );
}
