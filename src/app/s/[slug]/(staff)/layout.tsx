import { notFound } from 'next/navigation';
import { SharedStaffLayout } from '@/components/layout/school/SharedStaffLayout';
import { isValidSchoolSlug } from '@/lib/schoolAdmin';
import { getSchoolBranding } from '@/mocks/schoolAdminG1G3.mock';

export default async function SharedStaffRouteLayout({
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
    <SharedStaffLayout slug={slug} branding={branding}>
      {children}
    </SharedStaffLayout>
  );
}
