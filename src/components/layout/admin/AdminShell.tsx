'use client';

import { PortalShell } from '@/components/layout/PortalShell';
import { AdminSidebar } from './AdminSidebar';

export type AdminShellProps = {
  children: React.ReactNode;
};

export function AdminShell({ children }: AdminShellProps) {
  return (
    <PortalShell
      sidebar={<AdminSidebar />}
      header={
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--color-border)] bg-white px-4 sm:px-6">
          <p className="truncate text-sm text-[var(--color-text-secondary)]">
            Edu Station · Internal
          </p>
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="rounded-full bg-[var(--color-primary-light)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-dark)]">
              Super admin
            </span>
            <span className="hidden text-sm font-medium md:inline">admin@edustation.pk</span>
          </div>
        </header>
      }>
      {children}
    </PortalShell>
  );
}
