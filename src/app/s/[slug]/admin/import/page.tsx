import { SchoolAdminCsvImportScreen } from '@/screens/school-admin/CsvImport/SchoolAdminCsvImportScreen';

type PageProps = { params: Promise<{ slug: string }> };

export default async function SchoolAdminImportPage({ params }: PageProps) {
  const { slug } = await params;
  return <SchoolAdminCsvImportScreen slug={slug} />;
}
