import { SharedNotificationsScreen } from '@/screens/shared/Notifications/SharedNotificationsScreen';

export default async function SharedNotificationsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <SharedNotificationsScreen slug={slug} />;
}
