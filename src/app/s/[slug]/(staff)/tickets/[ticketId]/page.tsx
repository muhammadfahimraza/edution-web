import { SharedTicketDetailScreen } from '@/screens/shared/TicketDetail/SharedTicketDetailScreen';

export default async function SharedTicketDetailPage({
  params,
}: {
  params: Promise<{ ticketId: string }>;
}) {
  const { ticketId } = await params;
  return <SharedTicketDetailScreen ticketId={ticketId} />;
}
