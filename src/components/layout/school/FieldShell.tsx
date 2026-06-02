'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SyncStatusBanner } from '@/components/field/SyncStatusBanner';
import { SchoolBrandingHeader } from '@/components/layout/school/SchoolBrandingHeader';
import { schoolFieldBasePath } from '@/lib/schoolPortal';
import type { SyncState } from '@/mocks/field.mock';
import type { SchoolBranding } from '@/mocks/schoolAdminG1G3.mock';
import { useSchoolBranding } from './useSchoolBranding';

export type FieldShellProps = {
  slug: string;
  branding: SchoolBranding;
  children: React.ReactNode;
};

/** Mobile-first field assessor shell with J7 sync banner */
export function FieldShell({ slug, branding: initialBranding, children }: FieldShellProps) {
  const { branding, brandStyle } = useSchoolBranding(slug, initialBranding);
  const [syncState, setSyncState] = useState<SyncState>('synced');
  const [pendingCount, setPendingCount] = useState(0);

  const retrySync = () => {
    setSyncState('syncing');
    setTimeout(() => {
      setSyncState('synced');
      setPendingCount(0);
    }, 1200);
  };

  const toggleOfflineDemo = () => {
    if (syncState === 'offline') {
      setSyncState('pending');
      setPendingCount(2);
    } else {
      setSyncState('offline');
    }
  };

  return (
    <div
      className="flex min-h-screen flex-col bg-[var(--color-background)]"
      style={brandStyle}>
      <SchoolBrandingHeader
        branding={branding}
        slug={slug}
        portal="field"
        roleLabel="Field assessor"
        userEmail="imran.shah@edustation.pk"
      />
      <SyncStatusBanner state={syncState} pendingCount={pendingCount} onRetry={retrySync} />
      <div className="border-b border-[var(--color-border)] bg-white px-4 py-1 text-center">
        <button
          type="button"
          onClick={toggleOfflineDemo}
          className="text-xs text-[var(--color-text-secondary)] underline">
          Toggle offline demo (J7)
        </button>
      </div>
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-4 md:max-w-2xl md:px-6 md:py-6">
        {children}
      </main>
      <footer className="border-t border-[var(--color-border)] bg-white px-4 py-3">
        <Link
          href={schoolFieldBasePath(slug)}
          className="block text-center text-sm font-medium text-[var(--color-primary)]">
          ← Today&apos;s visits
        </Link>
      </footer>
    </div>
  );
}
