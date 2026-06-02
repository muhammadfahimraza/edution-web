import { ReportSuspense } from '@/components/analytics/ReportSuspense';
import { EngagementReportView } from '@/screens/shared/reports/EngagementReportView';

type PageProps = { params: Promise<{ slug: string }> };

export default async function SchoolAdminEngagementReportPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <ReportSuspense>
      <EngagementReportView slug={slug} />
    </ReportSuspense>
  );
}
