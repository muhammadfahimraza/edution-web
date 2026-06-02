'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { SchoolBrandingHeader } from '@/components/layout/school/SchoolBrandingHeader';
import { staffPortalPath, type StaffPortalRole } from '@/lib/schoolPortal';
import type { SchoolBranding } from '@/mocks/schoolAdminG1G3.mock';
import { useSchoolBranding } from './useSchoolBranding';

export type SharedStaffLayoutProps = {
  slug: string;
  branding: SchoolBranding;
  children: React.ReactNode;
};

function SharedStaffLayoutInner({ slug, branding: initialBranding, children }: SharedStaffLayoutProps) {
  const { branding, brandStyle } = useSchoolBranding(slug, initialBranding);
  const searchParams = useSearchParams();
  const from = (searchParams.get('from') as StaffPortalRole) || 'admin';
  const backHref = staffPortalPath(slug, from);
  const roleLabels: Record<StaffPortalRole, string> = {
    admin: 'School admin',
    principal: 'Principal',
    teacher: 'Teacher',
    field: 'Field assessor',
  };

  return (
    <div
      className="flex min-h-screen flex-col bg-[var(--color-background)]"
      style={brandStyle}>
      <SchoolBrandingHeader
        branding={branding}
        slug={slug}
        portal={from === 'field' ? 'field' : from}
        roleLabel={roleLabels[from]}
      />
      <div className="border-b border-[var(--color-border)] bg-white px-4 py-2 sm:px-6">
        <Link href={backHref} className="text-sm font-medium text-[var(--color-primary)] hover:underline">
          ← Back to portal
        </Link>
      </div>
      <main className="mx-auto w-full max-w-3xl flex-1 p-4 sm:p-6">{children}</main>
    </div>
  );
}

export function SharedStaffLayout(props: SharedStaffLayoutProps) {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-[var(--color-text-secondary)]">Loading…</div>}>
      <SharedStaffLayoutInner {...props} />
    </Suspense>
  );
}
