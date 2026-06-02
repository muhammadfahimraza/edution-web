'use client';

import { useMemo } from 'react';
import { useDemoSession } from '@/lib/demo-session/DemoSessionProvider';
import { schoolBrandCssVariables } from '@/lib/schoolBrandColors';
import type { SchoolBranding } from '@/mocks/schoolAdminG1G3.mock';

export function useSchoolBranding(slug: string, initial: SchoolBranding) {
  const { getBranding } = useDemoSession();

  const branding = useMemo(() => {
    const session = getBranding(slug);
    return {
      displayName: session.displayName ?? initial.displayName,
      primaryColor: session.primaryColor ?? initial.primaryColor,
    };
  }, [getBranding, slug, initial.displayName, initial.primaryColor]);

  const brandStyle = useMemo(
    () => schoolBrandCssVariables(branding.primaryColor),
    [branding.primaryColor],
  );

  return { branding, brandStyle };
}
