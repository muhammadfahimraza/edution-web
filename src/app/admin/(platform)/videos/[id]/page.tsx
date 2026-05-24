import { AdminVideoDetailScreen } from '@/screens/admin/VideoDetail/AdminVideoDetailScreen';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminVideoDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <AdminVideoDetailScreen videoId={id} />;
}
