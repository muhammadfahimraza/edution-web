import { SchoolAdminBrandingScreen } from '@/screens/school-admin/Branding/SchoolAdminBrandingScreen';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SchoolAdminBrandingPage({ params }: PageProps) {
  const { slug } = await params;
  return <SchoolAdminBrandingScreen slug={slug} />;
}
