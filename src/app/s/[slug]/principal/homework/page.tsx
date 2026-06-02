import { ReportSuspense } from '@/components/analytics/ReportSuspense';
import { PrincipalHomeworkReportScreen } from '@/screens/principal/HomeworkReport/PrincipalHomeworkReportScreen';

type PageProps = { params: Promise<{ slug: string }> };

export default async function PrincipalHomeworkPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <ReportSuspense>
      <PrincipalHomeworkReportScreen slug={slug} />
    </ReportSuspense>
  );
}
