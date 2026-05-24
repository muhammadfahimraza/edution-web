import { notFound } from 'next/navigation';
import { TeacherShell } from '@/components/layout/school/TeacherShell';
import { isValidSchoolSlug } from '@/lib/schoolAdmin';
import { getSchoolBranding } from '@/mocks/schoolAdminG1G3.mock';

export default async function TeacherLayout({
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
    <TeacherShell slug={slug} branding={branding}>
      {children}
    </TeacherShell>
  );
}
