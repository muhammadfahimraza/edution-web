import { SharedProfileScreen } from '@/screens/shared/Profile/SharedProfileScreen';

export default async function SharedProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <SharedProfileScreen slug={slug} />;
}
