import { ReportSuspense } from '@/components/analytics/ReportSuspense';
import { ExportCenterView } from '@/screens/shared/reports/ExportCenterView';

type PageProps = { params: Promise<{ slug: string }> };

export default async function SchoolAdminExportPage({ params }: PageProps) {
  const { slug } = await params;
  return (
    <ReportSuspense>
      <ExportCenterView slug={slug} />
    </ReportSuspense>
  );
}
