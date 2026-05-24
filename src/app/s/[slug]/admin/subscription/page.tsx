import { SchoolAdminSubscriptionScreen } from '@/screens/school-admin/Subscription/SchoolAdminSubscriptionScreen';

type PageProps = { params: Promise<{ slug: string }> };

export default async function SchoolAdminSubscriptionPage({ params }: PageProps) {
  const { slug } = await params;
  return <SchoolAdminSubscriptionScreen slug={slug} />;
}
