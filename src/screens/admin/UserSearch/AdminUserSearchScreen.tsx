'use client';

import { useMemo, useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { SideDrawer } from '@/components/admin/SideDrawer';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { useDemoSession } from '@/lib/demo-session/DemoSessionProvider';
import type { PlatformUser } from '@/mocks/adminF4F9.mock';

function roleLabel(role: PlatformUser['role']) {
  return role.replace('_', ' ');
}

/**
 * F5 — Global user search + detail drawer
 */
export function AdminUserSearchScreen() {
  const { showToast } = useToast();
  const { platformUsers, setPlatformUserStatus } = useDemoSession();
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return platformUsers;
    }
    return platformUsers.filter(
      u =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.schoolName?.toLowerCase().includes(q) ?? false),
    );
  }, [query, platformUsers]);
  const selected = selectedId ? platformUsers.find(u => u.id === selectedId) : undefined;

  return (
    <>
      <AdminPageHeader
        title="User search"
        subtitle="Search across all schools by name, email, phone, or ID"
      />

      <div className="mb-4 max-w-xl">
        <Input
          label="Search users"
          placeholder="Name, email, phone, user ID, school…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          hint={`${results.length} result${results.length === 1 ? '' : 's'}`}
        />
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={results}
          keyExtractor={row => row.id}
          emptyMessage="No users found. Try a different query."
          columns={[
            {
              key: 'name',
              header: 'Name',
              render: row => (
                <button
                  type="button"
                  className="text-left font-medium text-[var(--color-primary)] hover:underline"
                  onClick={() => setSelectedId(row.id)}>
                  {row.name}
                </button>
              ),
            },
            { key: 'email', header: 'Email', render: row => row.email },
            { key: 'phone', header: 'Phone', render: row => row.phone },
            {
              key: 'role',
              header: 'Role',
              render: row => <Badge label={roleLabel(row.role)} variant="primary" />,
            },
            {
              key: 'school',
              header: 'School',
              render: row => row.schoolName ?? '—',
            },
            {
              key: 'status',
              header: 'Status',
              render: row => (
                <Badge
                  label={row.status}
                  variant={row.status === 'active' ? 'success' : 'error'}
                />
              ),
            },
          ]}
        />
      </div>

      <SideDrawer
        open={!!selected}
        onClose={() => setSelectedId(null)}
        title={selected?.name ?? ''}
        subtitle={selected ? `User ${selected.id}` : undefined}
        footer={
          selected ? (
            <div className="flex gap-2">
              <Button
                label={selected.status === 'active' ? 'Suspend user' : 'Reactivate'}
                variant="outline"
                size="sm"
                onClick={() => {
                  const next = selected.status === 'active' ? 'suspended' : 'active';
                  setPlatformUserStatus(selected.id, next);
                  showToast({
                    title: next === 'suspended' ? 'User suspended' : 'User reactivated',
                    body: selected.name,
                  });
                }}
              />
              <Button
                label="View audit log"
                variant="ghost"
                size="sm"
                onClick={() =>
                  showToast({ title: 'Audit log', body: 'Full audit trail opens in production.', variant: 'info' })
                }
              />
            </div>
          ) : undefined
        }>
        {selected ? (
          <dl className="flex flex-col gap-3 text-sm">
            <div>
              <dt className="text-[var(--color-text-secondary)]">Email</dt>
              <dd className="font-medium">{selected.email}</dd>
            </div>
            <div>
              <dt className="text-[var(--color-text-secondary)]">Phone</dt>
              <dd className="font-medium">{selected.phone}</dd>
            </div>
            <div>
              <dt className="text-[var(--color-text-secondary)]">Role</dt>
              <dd>
                <Badge label={roleLabel(selected.role)} variant="primary" />
              </dd>
            </div>
            <div>
              <dt className="text-[var(--color-text-secondary)]">School</dt>
              <dd className="font-medium">
                {selected.schoolName ?? 'Platform (no school)'}
                {selected.schoolSlug ? (
                  <span className="block text-xs text-[var(--color-text-secondary)]">
                    /s/{selected.schoolSlug}
                  </span>
                ) : null}
              </dd>
            </div>
            <div>
              <dt className="text-[var(--color-text-secondary)]">Last active</dt>
              <dd className="font-medium">{selected.lastActive}</dd>
            </div>
            <div>
              <dt className="text-[var(--color-text-secondary)]">Status</dt>
              <dd>
                <Badge
                  label={selected.status}
                  variant={selected.status === 'active' ? 'success' : 'error'}
                />
              </dd>
            </div>
          </dl>
        ) : null}
      </SideDrawer>
    </>
  );
}
