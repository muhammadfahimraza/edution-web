import { ReportSuspense } from '@/components/analytics/ReportSuspense';
import { PrincipalExportCenterScreen } from '@/screens/principal/ExportCenter/PrincipalExportCenterScreen';

type PageProps = { params: Promise<{ slug: string }> };

export default async function PrincipalExportPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <ReportSuspense>
      <PrincipalExportCenterScreen slug={slug} />
    </ReportSuspense>
  );
}
