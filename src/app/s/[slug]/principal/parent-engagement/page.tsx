import { PrincipalParentEngagementScreen } from '@/screens/principal/ParentEngagement/PrincipalParentEngagementScreen';

type PageProps = { params: Promise<{ slug: string }> };

export default async function PrincipalParentEngagementPage({ params }: PageProps) {
  const { slug } = await params;
  return <PrincipalParentEngagementScreen slug={slug} />;
}
