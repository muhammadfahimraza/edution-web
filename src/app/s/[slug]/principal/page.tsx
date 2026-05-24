import { PrincipalDashboardScreen } from '@/screens/principal/Dashboard/PrincipalDashboardScreen';

type PageProps = { params: Promise<{ slug: string }> };

export default async function PrincipalDashboardPage({ params }: PageProps) {
  const { slug } = await params;
  return <PrincipalDashboardScreen slug={slug} />;
}
