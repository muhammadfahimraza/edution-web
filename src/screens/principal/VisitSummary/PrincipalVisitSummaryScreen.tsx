import { VisitsReportView } from '@/screens/shared/reports/VisitsReportView';

export function PrincipalVisitSummaryScreen({ slug }: { slug: string }) {
  return <VisitsReportView slug={slug} />;
}
