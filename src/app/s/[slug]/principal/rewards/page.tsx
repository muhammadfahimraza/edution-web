import { PrincipalRewardsScreen } from '@/screens/principal/Rewards/PrincipalRewardsScreen';

type PageProps = { params: Promise<{ slug: string }> };

export default async function PrincipalRewardsPage({ params }: PageProps) {
  const { slug } = await params;
  return <PrincipalRewardsScreen slug={slug} />;
}
