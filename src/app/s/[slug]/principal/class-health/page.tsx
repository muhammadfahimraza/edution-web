import { PrincipalClassHealthScreen } from '@/screens/principal/ClassHealth/PrincipalClassHealthScreen';

type PageProps = { params: Promise<{ slug: string }> };

export default async function PrincipalClassHealthPage({ params }: PageProps) {
  const { slug } = await params;
  return <PrincipalClassHealthScreen slug={slug} />;
}
