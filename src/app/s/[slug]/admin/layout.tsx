import { notFound } from 'next/navigation';
import { SchoolAdminShell } from '@/components/layout/school/SchoolAdminShell';
import { isValidSchoolSlug } from '@/lib/schoolAdmin';
import { getSchoolBranding } from '@/mocks/schoolAdminG1G3.mock';

export default async function SchoolAdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isValidSchoolSlug(slug)) {
    notFound();
  }

  const branding = getSchoolBranding(slug);

  return (
    <SchoolAdminShell slug={slug} branding={branding}>
      {children}
    </SchoolAdminShell>
  );
}
