'use client';

import { AdminSidebar } from './AdminSidebar';

export type AdminShellProps = {
  children: React.ReactNode;
};

export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="flex min-h-screen bg-[var(--color-background)]">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-[var(--color-border)] bg-white px-6">
          <p className="text-sm text-[var(--color-text-secondary)]">
            Edu Station · Internal
          </p>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[var(--color-primary-light)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-dark)]">
              Super admin
            </span>
            <span className="text-sm font-medium">admin@edustation.pk</span>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
