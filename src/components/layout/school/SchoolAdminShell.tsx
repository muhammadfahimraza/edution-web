'use client';

import { PortalShell } from '@/components/layout/PortalShell';
import { SchoolAdminSidebar } from './SchoolAdminSidebar';
import { SchoolBrandingHeader } from './SchoolBrandingHeader';
import type { SchoolBranding } from '@/mocks/schoolAdminG1G3.mock';
import { useSchoolBranding } from './useSchoolBranding';

export type SchoolAdminShellProps = {
  slug: string;
  branding: SchoolBranding;
  children: React.ReactNode;
};

export function SchoolAdminShell({ slug, branding: initialBranding, children }: SchoolAdminShellProps) {
  const { branding, brandStyle } = useSchoolBranding(slug, initialBranding);

  return (
    <PortalShell
      style={brandStyle}
      sidebar={<SchoolAdminSidebar slug={slug} branding={branding} />}
      header={
        <SchoolBrandingHeader branding={branding} slug={slug} portal="admin" />
      }>
      {children}
    </PortalShell>
  );
}
