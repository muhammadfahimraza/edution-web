import { FieldCheckInScreen } from '@/screens/field/CheckIn/FieldCheckInScreen';

type PageProps = { params: Promise<{ slug: string; visitId: string }> };

export default async function FieldCheckInPage({ params }: PageProps) {
  const { slug, visitId } = await params;
  return <FieldCheckInScreen slug={slug} visitId={visitId} />;
}
