import { FieldClassListScreen } from '@/screens/field/ClassList/FieldClassListScreen';

type PageProps = { params: Promise<{ slug: string; visitId: string }> };

export default async function FieldClassListPage({ params }: PageProps) {
  const { slug, visitId } = await params;
  return <FieldClassListScreen slug={slug} visitId={visitId} />;
}
