import { AdminShell } from '@/components/layout/admin/AdminShell';

export default function AdminPlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}
