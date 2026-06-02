import { ReportSuspense } from '@/components/analytics/ReportSuspense';
import { ChatReportView } from '@/screens/shared/reports/ChatReportView';

type PageProps = { params: Promise<{ slug: string }> };

export default async function SchoolAdminChatReportPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <ReportSuspense>
      <ChatReportView slug={slug} />
    </ReportSuspense>
  );
}
