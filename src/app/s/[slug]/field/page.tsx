import { FieldVisitsScreen } from '@/screens/field/Visits/FieldVisitsScreen';

type PageProps = { params: Promise<{ slug: string }> };

export default async function FieldVisitsPage({ params }: PageProps) {
  const { slug } = await params;
  return <FieldVisitsScreen slug={slug} />;
}
