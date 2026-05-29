'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { useToast } from '@/components/ui/Toast';
import { useDemoSession } from '@/lib/demo-session/DemoSessionProvider';
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
 * F7 — Video detail: HTML5 player, metadata, approve / reject / request edit
 */
export function AdminVideoDetailScreen({ videoId }: AdminVideoDetailScreenProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const { getVideoStatus, setVideoStatus } = useDemoSession();
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

  const status = getVideoStatus(videoId, video.status);

  const runAction = (
    action: 'approved' | 'rejected' | 'pending',
    title: string,
    body: string,
  ) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVideoStatus(videoId, action === 'pending' ? 'pending' : action);
      showToast({ title, body });
      router.push('/admin/videos');
    }, 600);
  };

  const canModerate = status === 'pending';

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
          <div className="aspect-video overflow-hidden rounded-xl border border-[var(--color-border)] bg-black">
            <video
              key={video.videoUrl}
              src={video.videoUrl}
              controls
              playsInline
              className="h-full w-full"
              poster={undefined}>
              Your browser does not support video playback.
            </video>
          </div>

          {canModerate ? (
            <div className="mt-6 flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <h2 className="font-semibold">Moderation actions</h2>
              <div className="flex flex-wrap gap-2">
                <Button
                  label="Approve"
                  loading={loading}
                  onClick={() =>
                    runAction('approved', 'Video approved', `${video.title} will go live on the platform.`)
                  }
                />
                <Button
                  label="Reject"
                  variant="outline"
                  loading={loading}
                  onClick={() => {
                    if (!rejectReason.trim()) {
                      showToast({
                        title: 'Rejection reason required',
                        body: 'Enter a reason before rejecting this video.',
                        variant: 'error',
                      });
                      return;
                    }
                    runAction('rejected', 'Video rejected', rejectReason);
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
                    showToast({
                      title: 'Note required',
                      body: 'Add feedback for the teacher before requesting edits.',
                      variant: 'error',
                    });
                    return;
                  }
                  runAction('pending', 'Edit requested', editNote);
                }}
              />
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-4 text-sm">
              {status === 'rejected' && video.rejectReason ? (
                <p>
                  <span className="font-semibold text-[var(--color-error)]">Rejected: </span>
                  {video.rejectReason}
                </p>
              ) : (
                <p className="text-[var(--color-text-secondary)]">
                  This video was {status}
                  {video.reviewedAt ? ` on ${video.reviewedAt}` : ''}.
                </p>
              )}
            </div>
          )}
        </div>

        <aside className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <Badge label={status} variant={statusVariant(status)} />
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
