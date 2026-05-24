import { LegalScreen } from '@/screens/public/Legal/LegalScreen';

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <LegalScreen slug={slug} />;
}
