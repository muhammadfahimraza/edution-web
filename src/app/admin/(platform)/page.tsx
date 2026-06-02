import { ReportSuspense } from '@/components/analytics/ReportSuspense';
import { AdminDashboardScreen } from '@/screens/admin/Dashboard/AdminDashboardScreen';

export default function AdminDashboardPage() {
  return (
    <ReportSuspense>
      <AdminDashboardScreen />
    </ReportSuspense>
  );
}
