import { ReportSuspense } from '@/components/analytics/ReportSuspense';
import { PrincipalEngagementScreen } from '@/screens/principal/Engagement/PrincipalEngagementScreen';

type PageProps = { params: Promise<{ slug: string }> };

export default async function PrincipalEngagementPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <ReportSuspense>
      <PrincipalEngagementScreen slug={slug} />
    </ReportSuspense>
  );
}
