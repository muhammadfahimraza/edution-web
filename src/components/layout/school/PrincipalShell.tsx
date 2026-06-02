'use client';

import { PortalShell } from '@/components/layout/PortalShell';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AppIcon } from '@/components/ui/AppIcon';
import { cn, getInitial } from '@/lib/utils';
import { schoolPrincipalBasePath } from '@/lib/schoolPortal';
import { SchoolBrandingHeader } from './SchoolBrandingHeader';
import type { IconName } from '@/lib/icons';
import type { SchoolBranding } from '@/mocks/schoolAdminG1G3.mock';
import { useSchoolBranding } from './useSchoolBranding';

type NavItem = { segment: string; label: string; icon: IconName; exact?: boolean };

const OVERVIEW_ITEMS: NavItem[] = [
  { segment: '', label: 'Dashboard', icon: 'layoutDashboard', exact: true },
  { segment: '/class-health', label: 'Class health', icon: 'users' },
  { segment: '/at-risk', label: 'At-risk students', icon: 'alertTriangle' },
  { segment: '/attendance', label: 'Attendance', icon: 'clipboardList' },
];

const INSIGHTS_ITEMS: NavItem[] = [
  { segment: '/homework', label: 'Homework report', icon: 'fileText' },
  { segment: '/engagement', label: 'Engagement', icon: 'trendingUp' },
  { segment: '/learning', label: 'Learn & Spotlight', icon: 'tv' },
  { segment: '/leaderboards', label: 'Leaderboards', icon: 'trophy' },
  { segment: '/points', label: 'Points & merit', icon: 'medal' },
  { segment: '/visits', label: 'Visit assessments', icon: 'target' },
  { segment: '/timetable', label: 'Timetable', icon: 'calendarRange' },
  { segment: '/parent-engagement', label: 'Parent engagement', icon: 'smartphone' },
  { segment: '/rewards', label: 'Rewards', icon: 'gift' },
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
    <aside className="flex h-full w-64 shrink-0 flex-col overflow-hidden border-r border-white/10 bg-[#1A1D21] text-white">
      <div className="shrink-0 border-b border-white/10 px-4 py-5">
        <Link href={base} className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg text-lg font-bold text-white" style={{ backgroundColor: branding.primaryColor }}>{getInitial(branding.displayName)}</div>
          <div className="min-w-0"><p className="truncate text-sm font-semibold">{branding.displayName.split(' ')[0]}</p><p className="text-xs text-white/50">Principal portal</p></div>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-4" aria-label="Principal">
        <NavSection title="Overview" items={OVERVIEW_ITEMS} base={base} pathname={pathname} primaryColor={branding.primaryColor} />
        <div className="mt-6"><NavSection title="Insights" items={INSIGHTS_ITEMS} base={base} pathname={pathname} primaryColor={branding.primaryColor} /></div>
        <div className="mt-6"><NavSection title="Operations" items={OPERATIONS_ITEMS} base={base} pathname={pathname} primaryColor={branding.primaryColor} /></div>
      </nav>
      <div className="shrink-0 border-t border-white/10 p-4"><Link href="/login" className="text-sm text-white/60 hover:text-white">← Sign out</Link></div>
    </aside>
  );
}

export type PrincipalShellProps = { slug: string; branding: SchoolBranding; children: React.ReactNode };

export function PrincipalShell({ slug, branding: initialBranding, children }: PrincipalShellProps) {
  const { branding, brandStyle } = useSchoolBranding(slug, initialBranding);

  return (
    <PortalShell
      style={brandStyle}
      sidebar={<PrincipalSidebar slug={slug} branding={branding} />}
      header={
        <SchoolBrandingHeader
          branding={branding}
          slug={slug}
          portal="principal"
          roleLabel="Principal"
          userEmail="principal@school.edu.pk"
        />
      }>
      {children}
    </PortalShell>
  );
}
