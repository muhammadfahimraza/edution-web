'use client';

import Link from 'next/link';
import { cn, getInitial } from '@/lib/utils';
import { AppIcon } from '@/components/ui/AppIcon';
import { NotificationsDropdown } from '@/components/shared/NotificationsDropdown';
import type { SchoolBranding } from '@/mocks/schoolAdminG1G3.mock';

export type SchoolBrandingHeaderProps = {
  branding: SchoolBranding;
  slug: string;
  portal?: 'admin' | 'principal' | 'teacher' | 'field';
  roleLabel?: string;
  userEmail?: string;
  showStaffActions?: boolean;
  className?: string;
};

export function SchoolBrandingHeader({
  branding,
  slug,
  portal = 'admin',
  roleLabel = 'School admin',
  userEmail = 'admin@school.edu.pk',
  showStaffActions = true,
  className,
}: SchoolBrandingHeaderProps) {
  const initial = getInitial(branding.displayName);

  return (
    <header
      className={cn(
        'flex h-14 shrink-0 items-center justify-between border-b border-[var(--color-border)] bg-white px-4 sm:px-6',
        className,
      )}>
      <div className="flex min-w-0 items-center gap-3">
        <div
          className="flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
          style={{ backgroundColor: branding.primaryColor }}>
          {initial}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[var(--color-text)]">
            {branding.displayName}
          </p>
          <p className="truncate text-xs text-[var(--color-text-secondary)]">/s/{slug}/{portal}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        {showStaffActions ? (
          <>
            <NotificationsDropdown slug={slug} />
            <Link
              href={`/s/${slug}/profile?from=${portal}`}
              className="flex size-9 items-center justify-center rounded-lg border border-[var(--color-border)] bg-white hover:bg-[var(--color-background)]"
              title="Profile"
              aria-label="Profile">
              <AppIcon name="user" size={18} className="text-[var(--color-text-secondary)]" />
            </Link>
          </>
        ) : null}
        <span
          className="hidden rounded-full px-3 py-1 text-xs font-semibold text-white sm:inline"
          style={{ backgroundColor: branding.primaryColor }}>
          {roleLabel}
        </span>
        <span className="hidden text-sm font-medium md:inline">{userEmail}</span>
      </div>
    </header>
  );
}
