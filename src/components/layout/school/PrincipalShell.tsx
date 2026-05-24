'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AppIcon } from '@/components/ui/AppIcon';
import { cn, getInitial } from '@/lib/utils';
import { schoolPrincipalBasePath } from '@/lib/schoolPortal';
import { SchoolBrandingHeader } from './SchoolBrandingHeader';
import type { IconName } from '@/lib/icons';
import type { SchoolBranding } from '@/mocks/schoolAdminG1G3.mock';

type NavItem = { segment: string; label: string; icon: IconName; exact?: boolean };

const OVERVIEW_ITEMS: NavItem[] = [
  { segment: '', label: 'Dashboard', icon: 'layoutDashboard', exact: true },
  { segment: '/attendance', label: 'Attendance', icon: 'clipboardList' },
];

const REPORTS_ITEMS: NavItem[] = [
  { segment: '/homework', label: 'Homework report', icon: 'fileText' },
  { segment: '/leaderboards', label: 'Leaderboards', icon: 'trophy' },
  { segment: '/visits', label: 'Visit assessments', icon: 'target' },
  { segment: '/engagement', label: 'Engagement', icon: 'trendingUp' },
];

const OPERATIONS_ITEMS: NavItem[] = [
  { segment: '/tickets', label: 'Tickets', icon: 'ticket' },
  { segment: '/chat-audit', label: 'Chat audit', icon: 'shield' },
  { segment: '/announcements', label: 'Announcements', icon: 'megaphone' },
  { segment: '/export', label: 'Export center', icon: 'upload' },
];

function NavSection({ title, items, base, pathname, primaryColor }: { title: string; items: NavItem[]; base: string; pathname: string; primaryColor: string }) {
  return (
    <>
      <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-white/40">{title}</p>
      <ul className="flex flex-col gap-1">
        {items.map(item => {
          const href = item.segment ? `${base}${item.segment}` : base;
          const active = item.exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={item.segment || 'home'}>
              <Link href={href} className={cn('flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors', active ? 'text-white' : 'text-white/75 hover:bg-white/10 hover:text-white')} style={active ? { backgroundColor: primaryColor } : undefined}>
                <AppIcon name={item.icon} size={18} className={active ? 'text-white' : 'text-white/75'} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function PrincipalSidebar({ slug, branding }: { slug: string; branding: SchoolBranding }) {
  const pathname = usePathname();
  const base = schoolPrincipalBasePath(slug);
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-white/10 bg-[#1A1D21] text-white">
      <div className="border-b border-white/10 px-4 py-5">
        <Link href={base} className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg text-lg font-bold text-white" style={{ backgroundColor: branding.primaryColor }}>{getInitial(branding.displayName)}</div>
          <div className="min-w-0"><p className="truncate text-sm font-semibold">{branding.displayName.split(' ')[0]}</p><p className="text-xs text-white/50">Principal portal</p></div>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-4" aria-label="Principal">
        <NavSection title="Overview" items={OVERVIEW_ITEMS} base={base} pathname={pathname} primaryColor={branding.primaryColor} />
        <div className="mt-6"><NavSection title="Reports" items={REPORTS_ITEMS} base={base} pathname={pathname} primaryColor={branding.primaryColor} /></div>
        <div className="mt-6"><NavSection title="Operations" items={OPERATIONS_ITEMS} base={base} pathname={pathname} primaryColor={branding.primaryColor} /></div>
      </nav>
      <div className="border-t border-white/10 p-4"><Link href="/login" className="text-sm text-white/60 hover:text-white">← Sign out</Link></div>
    </aside>
  );
}

export type PrincipalShellProps = { slug: string; branding: SchoolBranding; children: React.ReactNode };

export function PrincipalShell({ slug, branding, children }: PrincipalShellProps) {
  return (
    <div className="flex min-h-screen bg-[var(--color-background)]">
      <PrincipalSidebar slug={slug} branding={branding} />
      <div className="flex min-w-0 flex-1 flex-col">
        <SchoolBrandingHeader branding={branding} slug={slug} portal="principal" roleLabel="Principal" userEmail="principal@school.edu.pk" />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
