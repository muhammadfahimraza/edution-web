import { ReportSuspense } from '@/components/analytics/ReportSuspense';
import { LeaderboardReportView } from '@/screens/shared/reports/LeaderboardReportView';

type PageProps = { params: Promise<{ slug: string }> };

export default async function SchoolAdminLeaderboardsReportPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <ReportSuspense>
      <LeaderboardReportView slug={slug} />
    </ReportSuspense>
  );
}
