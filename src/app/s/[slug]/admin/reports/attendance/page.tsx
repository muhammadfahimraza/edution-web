import { ReportSuspense } from '@/components/analytics/ReportSuspense';
import { AttendanceReportView } from '@/screens/shared/reports/AttendanceReportView';

type PageProps = { params: Promise<{ slug: string }> };

export default async function SchoolAdminAttendanceReportPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <ReportSuspense>
      <AttendanceReportView slug={slug} />
    </ReportSuspense>
  );
}
