import { ReportSuspense } from '@/components/analytics/ReportSuspense';
import { VisitsReportView } from '@/screens/shared/reports/VisitsReportView';

type PageProps = { params: Promise<{ slug: string }> };

export default async function SchoolAdminVisitsReportPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <ReportSuspense>
      <VisitsReportView slug={slug} />
    </ReportSuspense>
  );
}
