import { ReportSuspense } from '@/components/analytics/ReportSuspense';
import { HomeworkReportView } from '@/screens/shared/reports/HomeworkReportView';

type PageProps = { params: Promise<{ slug: string }> };

export default async function SchoolAdminHomeworkReportPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <ReportSuspense>
      <HomeworkReportView slug={slug} />
    </ReportSuspense>
  );
}
