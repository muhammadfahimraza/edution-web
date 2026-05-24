'use client';

import { SchoolAdminSidebar } from './SchoolAdminSidebar';
import { SchoolBrandingHeader } from './SchoolBrandingHeader';
import type { SchoolBranding } from '@/mocks/schoolAdminG1G3.mock';

export type SchoolAdminShellProps = {
  slug: string;
  branding: SchoolBranding;
  children: React.ReactNode;
};

export function SchoolAdminShell({ slug, branding, children }: SchoolAdminShellProps) {
  return (
    <div className="flex min-h-screen bg-[var(--color-background)]">
      <SchoolAdminSidebar slug={slug} branding={branding} />
      <div className="flex min-w-0 flex-1 flex-col">
        <SchoolBrandingHeader branding={branding} slug={slug} portal="admin" />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
