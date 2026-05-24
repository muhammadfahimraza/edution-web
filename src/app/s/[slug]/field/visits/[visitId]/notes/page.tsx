import { FieldVisitNotesScreen } from '@/screens/field/VisitNotes/FieldVisitNotesScreen';

type PageProps = { params: Promise<{ slug: string; visitId: string }> };

export default async function FieldVisitNotesPage({ params }: PageProps) {
  const { slug, visitId } = await params;
  return <FieldVisitNotesScreen slug={slug} visitId={visitId} />;
}
