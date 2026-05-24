'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import {
  formatDuration,
  mockPlatformVideos,
  type VideoReviewStatus,
} from '@/mocks/adminF4F9.mock';

function statusVariant(status: VideoReviewStatus) {
  switch (status) {
    case 'approved':
      return 'success' as const;
    case 'rejected':
      return 'error' as const;
    default:
      return 'warning' as const;
  }
}

const TABS: { id: VideoReviewStatus | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'approved', label: 'Approved' },
  { id: 'rejected', label: 'Rejected' },
];

/**
 * F6 — Video approval queue
 */
export function AdminVideoQueueScreen() {
  const [tab, setTab] = useState<VideoReviewStatus | 'all'>('pending');

  const filtered = useMemo(() => {
    if (tab === 'all') return mockPlatformVideos;
    return mockPlatformVideos.filter(v => v.status === tab);
  }, [tab]);

  const pendingCount = mockPlatformVideos.filter(v => v.status === 'pending').length;

  return (
    <>
      <AdminPageHeader
        title="Video approval"
        subtitle={`${pendingCount} pending review`}
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {TABS.map(t => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={
              tab === t.id
                ? 'rounded-full bg-[var(--color-primary)] px-4 py-1.5 text-sm font-semibold text-white'
                : 'rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:border-[var(--color-primary)]'
            }>
            {t.label}
            {t.id !== 'all' ? (
              <span className="ml-1 opacity-80">
                ({mockPlatformVideos.filter(v => v.status === t.id).length})
              </span>
            ) : null}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={filtered}
          keyExtractor={row => row.id}
          emptyMessage="No videos in this queue."
          columns={[
            {
              key: 'title',
              header: 'Title',
              render: row => (
                <Link
                  href={`/admin/videos/${row.id}`}
                  className="font-medium text-[var(--color-primary)] hover:underline">
                  {row.title}
                </Link>
              ),
            },
            { key: 'teacher', header: 'Teacher', render: row => row.teacherName },
            { key: 'school', header: 'School', render: row => row.schoolName },
            {
              key: 'subject',
              header: 'Subject / topic',
              render: row => (
                <span className="text-[var(--color-text-secondary)]">
                  {row.subject} · {row.topic}
                </span>
              ),
            },
            {
              key: 'duration',
              header: 'Duration',
              render: row => formatDuration(row.durationSec),
            },
            {
              key: 'status',
              header: 'Status',
              render: row => (
                <Badge label={row.status} variant={statusVariant(row.status)} />
              ),
            },
            {
              key: 'submitted',
              header: 'Submitted',
              render: row => row.submittedAt,
            },
          ]}
        />
      </div>
    </>
  );
}
