'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import {
  formatDuration,
  getPlatformVideoById,
  type PlatformVideo,
} from '@/mocks/adminF4F9.mock';

export type AdminVideoDetailScreenProps = {
  videoId: string;
};

function statusVariant(status: PlatformVideo['status']) {
  switch (status) {
    case 'approved':
      return 'success' as const;
    case 'rejected':
      return 'error' as const;
    default:
      return 'warning' as const;
  }
}

/**
 * F7 — Video detail: player placeholder, metadata, approve / reject / request edit
 */
export function AdminVideoDetailScreen({ videoId }: AdminVideoDetailScreenProps) {
  const router = useRouter();
  const video = getPlatformVideoById(videoId);
  const [rejectReason, setRejectReason] = useState('');
  const [editNote, setEditNote] = useState('');
  const [loading, setLoading] = useState(false);

  if (!video) {
    return (
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
        <p className="text-lg font-semibold">Video not found</p>
        <Link href="/admin/videos" className="mt-4 inline-block text-[var(--color-primary)]">
          ← Back to queue
        </Link>
      </div>
    );
  }

  const runAction = (action: string, message: string) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`${action}\n\n${message}\n\nUI demo — status not persisted.`);
      router.push('/admin/videos');
    }, 600);
  };

  const canModerate = video.status === 'pending';

  return (
    <>
      <AdminPageHeader
        title={video.title}
        subtitle={`${video.schoolName} · ${video.teacherName}`}
        actions={
          <Link href="/admin/videos">
            <Button label="← Queue" variant="outline" size="sm" />
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="aspect-video overflow-hidden rounded-xl border border-[var(--color-border)] bg-[#1A1D21]">
            <div className="flex h-full flex-col items-center justify-center gap-2 text-white/80">
              <span className="text-5xl" aria-hidden>
                ▶
              </span>
              <p className="text-sm">Video player placeholder</p>
              <p className="max-w-md px-4 text-center text-xs text-white/50">
                Production: HLS/DASH stream from CDN. Mock URL: {video.videoUrl}
              </p>
            </div>
          </div>

          {canModerate ? (
            <div className="mt-6 flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <h2 className="font-semibold">Moderation actions</h2>
              <div className="flex flex-wrap gap-2">
                <Button
                  label="Approve"
                  loading={loading}
                  onClick={() =>
                    runAction('Approved', `${video.title} will go live on the platform.`)
                  }
                />
                <Button
                  label="Reject"
                  variant="outline"
                  loading={loading}
                  onClick={() => {
                    if (!rejectReason.trim()) {
                      alert('Please enter a rejection reason.');
                      return;
                    }
                    runAction('Rejected', rejectReason);
                  }}
                />
              </div>
              <Textarea
                label="Rejection reason (required to reject)"
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                rows={2}
                placeholder="e.g. Audio quality too low"
              />
              <Textarea
                label="Request edit note (optional)"
                value={editNote}
                onChange={e => setEditNote(e.target.value)}
                rows={2}
                placeholder="Send back to teacher with feedback"
              />
              <Button
                label="Request edit"
                variant="secondary"
                size="sm"
                loading={loading}
                onClick={() => {
                  if (!editNote.trim()) {
                    alert('Add a note for the teacher.');
                    return;
                  }
                  runAction('Edit requested', editNote);
                }}
              />
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-4 text-sm">
              {video.status === 'rejected' && video.rejectReason ? (
                <p>
                  <span className="font-semibold text-[var(--color-error)]">Rejected: </span>
                  {video.rejectReason}
                </p>
              ) : (
                <p className="text-[var(--color-text-secondary)]">
                  This video was {video.status}
                  {video.reviewedAt ? ` on ${video.reviewedAt}` : ''}.
                </p>
              )}
            </div>
          )}
        </div>

        <aside className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <Badge label={video.status} variant={statusVariant(video.status)} />
          <dl className="mt-4 flex flex-col gap-3 text-sm">
            <div>
              <dt className="text-[var(--color-text-secondary)]">Duration</dt>
              <dd className="font-medium">{formatDuration(video.durationSec)}</dd>
            </div>
            <div>
              <dt className="text-[var(--color-text-secondary)]">Subject</dt>
              <dd className="font-medium">{video.subject}</dd>
            </div>
            <div>
              <dt className="text-[var(--color-text-secondary)]">Topic</dt>
              <dd className="font-medium">{video.topic}</dd>
            </div>
            <div>
              <dt className="text-[var(--color-text-secondary)]">Submitted</dt>
              <dd className="font-medium">{video.submittedAt}</dd>
            </div>
            {video.reviewedAt ? (
              <div>
                <dt className="text-[var(--color-text-secondary)]">Reviewed</dt>
                <dd className="font-medium">{video.reviewedAt}</dd>
              </div>
            ) : null}
            <div>
              <dt className="text-[var(--color-text-secondary)]">Description</dt>
              <dd className="mt-1 text-[var(--color-text)]">{video.description}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </>
  );
}
