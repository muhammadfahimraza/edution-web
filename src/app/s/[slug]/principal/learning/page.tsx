import { PrincipalLearningScreen } from '@/screens/principal/Learning/PrincipalLearningScreen';

type PageProps = { params: Promise<{ slug: string }> };

export default async function PrincipalLearningPage({ params }: PageProps) {
  const { slug } = await params;
  return <PrincipalLearningScreen slug={slug} />;
}
