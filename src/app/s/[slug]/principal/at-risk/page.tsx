import { PrincipalAtRiskScreen } from '@/screens/principal/AtRisk/PrincipalAtRiskScreen';

type PageProps = { params: Promise<{ slug: string }> };

export default async function PrincipalAtRiskPage({ params }: PageProps) {
  const { slug } = await params;
  return <PrincipalAtRiskScreen slug={slug} />;
}
