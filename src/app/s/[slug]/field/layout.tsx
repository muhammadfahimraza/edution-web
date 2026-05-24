import { notFound } from 'next/navigation';
import { FieldShell } from '@/components/layout/school/FieldShell';
import { isValidSchoolSlug } from '@/lib/schoolAdmin';
import { getSchoolBranding } from '@/mocks/schoolAdminG1G3.mock';

export default async function FieldLayout({
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
    <FieldShell slug={slug} branding={branding}>
      {children}
    </FieldShell>
  );
}
