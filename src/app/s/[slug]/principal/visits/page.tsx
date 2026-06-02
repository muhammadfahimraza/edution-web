import { ReportSuspense } from '@/components/analytics/ReportSuspense';
import { PrincipalVisitSummaryScreen } from '@/screens/principal/VisitSummary/PrincipalVisitSummaryScreen';

type PageProps = { params: Promise<{ slug: string }> };

export default async function PrincipalVisitsPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <ReportSuspense>
      <PrincipalVisitSummaryScreen slug={slug} />
    </ReportSuspense>
  );
}
