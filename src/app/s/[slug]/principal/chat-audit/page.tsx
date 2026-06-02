import { ReportSuspense } from '@/components/analytics/ReportSuspense';
import { PrincipalChatAuditScreen } from '@/screens/principal/ChatAudit/PrincipalChatAuditScreen';

type PageProps = { params: Promise<{ slug: string }> };

export default async function PrincipalChatAuditPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <ReportSuspense>
      <PrincipalChatAuditScreen slug={slug} />
    </ReportSuspense>
  );
}
