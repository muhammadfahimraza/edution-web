import { notFound } from 'next/navigation';
import { PrincipalShell } from '@/components/layout/school/PrincipalShell';
import { isValidSchoolSlug } from '@/lib/schoolAdmin';
import { getSchoolBranding } from '@/mocks/schoolAdminG1G3.mock';

export default async function PrincipalLayout({
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
    <PrincipalShell slug={slug} branding={branding}>
      {children}
    </PrincipalShell>
  );
}
