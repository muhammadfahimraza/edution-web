import { PrincipalPointsScreen } from '@/screens/principal/Points/PrincipalPointsScreen';

type PageProps = { params: Promise<{ slug: string }> };

export default async function PrincipalPointsPage({ params }: PageProps) {
  const { slug } = await params;
  return <PrincipalPointsScreen slug={slug} />;
}
