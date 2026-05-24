import Link from 'next/link';
import { EduStationLogo } from '@/components/brand/EduStationLogo';
import { Button } from '@/components/ui/Button';

export type PublicHeaderProps = {
  variant?: 'default' | 'dark';
};

export function PublicHeader({ variant = 'default' }: PublicHeaderProps) {
  const isDark = variant === 'dark';

  return (
    <header
      className={
        isDark
          ? 'border-b border-white/10 bg-[#1A1D21] text-white'
          : 'border-b border-[var(--color-border)] bg-white'
      }>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link
          href="/"
          className="shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]">
          <EduStationLogo size={40} showWordmark />
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          <Link
            href="/for-schools"
            className={
              isDark
                ? 'text-sm font-medium text-white/80 hover:text-white'
                : 'text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
            }>
            For schools
          </Link>
          <Link
            href="/login"
            className={
              isDark
                ? 'text-sm font-medium text-white/80 hover:text-white'
                : 'text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
            }>
            Staff login
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden sm:block">
            <Button
              label="Sign in"
              variant={isDark ? 'outline' : 'ghost'}
              size="sm"
              className={isDark ? 'border-white/30 text-white hover:bg-white/10' : undefined}
            />
          </Link>
          <Link href="/for-schools">
            <Button label="Get started" size="sm" />
          </Link>
        </div>
      </div>
    </header>
  );
}
