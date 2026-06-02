import { ReportSuspense } from '@/components/analytics/ReportSuspense';
import { PrincipalLeaderboardsScreen } from '@/screens/principal/Leaderboards/PrincipalLeaderboardsScreen';

type PageProps = { params: Promise<{ slug: string }> };

export default async function PrincipalLeaderboardsPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <ReportSuspense>
      <PrincipalLeaderboardsScreen slug={slug} />
    </ReportSuspense>
  );
}
