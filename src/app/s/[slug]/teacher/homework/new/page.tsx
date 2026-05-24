import { TeacherCreateHomeworkScreen } from '@/screens/teacher/CreateHomework/TeacherCreateHomeworkScreen';

type PageProps = { params: Promise<{ slug: string }> };

export default async function TeacherCreateHomeworkPage({ params }: PageProps) {
  const { slug } = await params;
  return <TeacherCreateHomeworkScreen slug={slug} />;
}
