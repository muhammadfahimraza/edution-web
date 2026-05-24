import { TeacherDashboardScreen } from '@/screens/teacher/Dashboard/TeacherDashboardScreen';

type PageProps = { params: Promise<{ slug: string }> };

export default async function TeacherDashboardPage({ params }: PageProps) {
  const { slug } = await params;
  return <TeacherDashboardScreen slug={slug} />;
}
