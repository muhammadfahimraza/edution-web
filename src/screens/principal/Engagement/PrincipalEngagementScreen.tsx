import { EngagementReportView } from '@/screens/shared/reports/EngagementReportView';

export function PrincipalEngagementScreen({ slug }: { slug: string }) {
  return <EngagementReportView slug={slug} />;
}
