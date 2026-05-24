'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import {
  mockAdminSchools,
  type AdminSchool,
  type AdminSchoolStatus,
} from '@/mocks/adminPlatform.mock';

function statusVariant(status: AdminSchoolStatus) {
  switch (status) {
    case 'active':
      return 'success' as const;
    case 'trial':
      return 'accent' as const;
    case 'onboarding':
      return 'primary' as const;
    case 'suspended':
      return 'error' as const;
  }
}

function planLabel(plan: AdminSchool['plan']) {
  return plan.charAt(0).toUpperCase() + plan.slice(1);
}

/**
 * F2 — Schools list with search/filter and add school CTA
 */
export function AdminSchoolsListScreen() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<AdminSchoolStatus | 'all'>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mockAdminSchools.filter(s => {
      if (statusFilter !== 'all' && s.status !== statusFilter) {
        return false;
      }
      if (!q) {
        return true;
      }
      return (
        s.name.toLowerCase().includes(q) ||
        s.slug.toLowerCase().includes(q) ||
        s.country.toLowerCase().includes(q)
      );
    });
  }, [query, statusFilter]);

  return (
    <>
      <AdminPageHeader
        title="Schools"
        subtitle={`${mockAdminSchools.length} schools on platform`}
        actions={
          <Link href="/admin/schools/new">
            <Button label="Add school" />
          </Link>
        }
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <Input
            label="Search"
            placeholder="Name, slug, or country…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(['all', 'active', 'trial', 'onboarding', 'suspended'] as const).map(s => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              className={
                statusFilter === s
                  ? 'rounded-full bg-[var(--color-primary)] px-3 py-1.5 text-xs font-semibold text-white'
                  : 'rounded-full border border-[var(--color-border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]'
              }>
              {s === 'all' ? 'All' : s}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={filtered}
          keyExtractor={row => row.id}
          emptyMessage="No schools match your filters."
          columns={[
            {
              key: 'name',
              header: 'School',
              render: row => (
                <div>
                  <p className="font-medium text-[var(--color-text)]">{row.name}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">/{row.slug}</p>
                </div>
              ),
            },
            {
              key: 'plan',
              header: 'Plan',
              render: row => <Badge label={planLabel(row.plan)} variant="primary" />,
            },
            {
              key: 'seats',
              header: 'Seats',
              render: row => (
                <span>
                  {row.studentCount.toLocaleString()} / {row.seatLimit.toLocaleString()}
                </span>
              ),
            },
            {
              key: 'status',
              header: 'Status',
              render: row => (
                <Badge label={row.status} variant={statusVariant(row.status)} />
              ),
            },
            {
              key: 'country',
              header: 'Country',
              render: row => row.country,
            },
            {
              key: 'created',
              header: 'Created',
              render: row => (
                <span className="text-[var(--color-text-secondary)]">{row.createdAt}</span>
              ),
            },
            {
              key: 'actions',
              header: '',
              className: 'text-right',
              render: row => (
                <Link
                  href={`/s/${row.slug}/admin`}
                  className="text-sm font-medium text-[var(--color-primary)] hover:underline">
                  Open admin
                </Link>
              ),
            },
          ]}
        />
      </div>
    </>
  );
}
