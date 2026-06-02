'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { EduStationLogo } from '@/components/brand/EduStationLogo';
import { AppIcon } from '@/components/ui/AppIcon';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export type PublicHeaderProps = {
  variant?: 'default' | 'dark';
};

const NAV_LINKS = [
  { href: '/for-schools', label: 'For schools' },
  { href: '/login', label: 'Staff login' },
] as const;

export function PublicHeader({ variant = 'default' }: PublicHeaderProps) {
  const isDark = variant === 'dark';
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const desktopLinkClass = isDark
    ? 'text-sm font-medium text-white/80 hover:text-white'
    : 'text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)]';
  const mobileLinkClass = isDark
    ? 'block rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white'
    : 'block rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-background)] hover:text-[var(--color-text)]';

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
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} className={desktopLinkClass}>
              {link.label}
            </Link>
          ))}
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
          <Link href="/for-schools" className="hidden sm:block">
            <Button label="Get started" size="sm" />
          </Link>
          <button
            type="button"
            className={cn(
              'flex size-11 items-center justify-center rounded-lg md:hidden',
              isDark ? 'text-white hover:bg-white/10' : 'text-[var(--color-text)] hover:bg-[var(--color-background)]',
            )}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(v => !v)}>
            <AppIcon name={menuOpen ? 'x' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          className={cn(
            'border-t md:hidden',
            isDark ? 'border-white/10 bg-[#1A1D21]' : 'border-[var(--color-border)] bg-white',
          )}>
          <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4" aria-label="Mobile">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href} className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/login" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>
              Sign in
            </Link>
            <Link
              href="/for-schools"
              className="mt-2 block"
              onClick={() => setMenuOpen(false)}>
              <Button label="Get started" size="md" fullWidth />
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
