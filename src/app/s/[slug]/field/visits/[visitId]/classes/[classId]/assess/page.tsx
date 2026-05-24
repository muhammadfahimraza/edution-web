import { FieldAssessmentScreen } from '@/screens/field/Assessment/FieldAssessmentScreen';

type PageProps = { params: Promise<{ slug: string; visitId: string; classId: string }> };

export default async function FieldAssessmentPage({ params }: PageProps) {
  const { slug, visitId, classId } = await params;
  return <FieldAssessmentScreen slug={slug} visitId={visitId} classId={classId} />;
}
