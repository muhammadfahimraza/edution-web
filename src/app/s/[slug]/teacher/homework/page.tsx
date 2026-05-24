import { TeacherHomeworkListScreen } from '@/screens/teacher/HomeworkList/TeacherHomeworkListScreen';

type PageProps = { params: Promise<{ slug: string }> };

export default async function TeacherHomeworkListPage({ params }: PageProps) {
  const { slug } = await params;
  return <TeacherHomeworkListScreen slug={slug} />;
}
