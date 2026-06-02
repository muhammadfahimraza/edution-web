import { ReportSuspense } from '@/components/analytics/ReportSuspense';
import { PrincipalAttendanceScreen } from '@/screens/principal/Attendance/PrincipalAttendanceScreen';

type PageProps = { params: Promise<{ slug: string }> };

export default async function PrincipalAttendancePage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <ReportSuspense>
      <PrincipalAttendanceScreen slug={slug} />
    </ReportSuspense>
  );
}
