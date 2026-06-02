import { AttendanceReportView } from '@/screens/shared/reports/AttendanceReportView';

export function PrincipalAttendanceScreen({ slug }: { slug: string }) {
  return <AttendanceReportView slug={slug} />;
}
