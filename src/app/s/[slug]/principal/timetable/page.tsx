import { PrincipalTimetableScreen } from '@/screens/principal/Timetable/PrincipalTimetableScreen';

type PageProps = { params: Promise<{ slug: string }> };

export default async function PrincipalTimetablePage({ params }: PageProps) {
  const { slug } = await params;
  return <PrincipalTimetableScreen slug={slug} />;
}
