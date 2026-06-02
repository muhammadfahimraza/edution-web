import { ReportSuspense } from '@/components/analytics/ReportSuspense';
import { SchoolAdminDashboardScreen } from '@/screens/school-admin/Dashboard/SchoolAdminDashboardScreen';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SchoolAdminDashboardPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <ReportSuspense>
      <SchoolAdminDashboardScreen slug={slug} />
    </ReportSuspense>
  );
}
