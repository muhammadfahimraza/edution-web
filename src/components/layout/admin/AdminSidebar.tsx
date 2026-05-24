'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { EduStationLogo } from '@/components/brand/EduStationLogo';
import { AppIcon } from '@/components/ui/AppIcon';
import type { IconName } from '@/lib/icons';
import { cn } from '@/lib/utils';

const NAV_ITEMS: { href: string; label: string; icon: IconName; exact?: boolean }[] = [
  { href: '/admin', label: 'Dashboard', icon: 'layoutDashboard', exact: true },
  { href: '/admin/schools', label: 'Schools', icon: 'school' },
  { href: '/admin/schools/new', label: 'Add school', icon: 'plus' },
  { href: '/admin/billing', label: 'Billing', icon: 'creditCard' },
  { href: '/admin/users', label: 'User search', icon: 'user' },
  { href: '/admin/videos', label: 'Video approval', icon: 'video' },
  { href: '/admin/teachers', label: 'Vetted teachers', icon: 'graduationCap' },
  { href: '/admin/taxonomy', label: 'Topic taxonomy', icon: 'puzzle' },
  { href: '/admin/rewards', label: 'Rewards catalog', icon: 'gift' },
  { href: '/admin/fulfillment', label: 'Fulfillment', icon: 'package' },
  { href: '/admin/visits', label: 'Visit schedule', icon: 'calendar' },
  { href: '/admin/leaderboards', label: 'Leaderboards', icon: 'trophy' },
  { href: '/admin/tickets', label: 'Escalated tickets', icon: 'ticket' },
  { href: '/admin/moderation', label: 'Moderation', icon: 'shield' },
  { href: '/admin/feature-flags', label: 'Feature flags', icon: 'flag' },
  { href: '/admin/sms-health', label: 'SMS health', icon: 'smartphone' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-white/10 bg-[#1A1D21] text-white">
      <div className="border-b border-white/10 px-4 py-5">
        <Link href="/admin" className="flex items-center gap-2">
          <EduStationLogo size={36} showWordmark />
        </Link>
        <p className="mt-2 text-xs text-white/50">Platform admin</p>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-4" aria-label="Admin">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-white/40">
          Manage
        </p>
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map(item => {
            const active = item.exact
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    active
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'text-white/75 hover:bg-white/10 hover:text-white',
                  )}>
                  <AppIcon name={item.icon} size={18} className={active ? 'text-white' : 'text-white/75'} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-white/10 p-4">
        <Link href="/" className="text-sm text-white/60 hover:text-white">
          ← Public site
        </Link>
      </div>
    </aside>
  );
}

function div({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}
