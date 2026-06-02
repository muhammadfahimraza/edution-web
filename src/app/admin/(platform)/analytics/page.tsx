import { ReportSuspense } from '@/components/analytics/ReportSuspense';
import { AdminAnalyticsScreen } from '@/screens/admin/Analytics/AdminAnalyticsScreen';

export default function AdminAnalyticsPage() {
  return (
    <ReportSuspense>
      <AdminAnalyticsScreen />
    </ReportSuspense>
  );
}
