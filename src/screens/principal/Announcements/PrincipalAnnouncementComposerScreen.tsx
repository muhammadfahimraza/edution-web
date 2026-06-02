'use client';

import { useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { SideDrawer } from '@/components/admin/SideDrawer';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useToast } from '@/components/ui/Toast';
import {
  announcementAudiences,
  mockRecentAnnouncements,
  type RecentAnnouncement,
} from '@/mocks/principal.mock';
import { cn } from '@/lib/utils';

const announcementBodies: Record<string, string> = {
  'ann-1': 'Summer term begins Monday, May 1. Please ensure students have updated timetables in the app.',
  'ann-2': 'Parent-teacher meetings are scheduled for May 22–24. Book slots via the school office.',
  'ann-3': 'Sports day for Grade 9 will be held on the main field. Students should wear house colours.',
};

export function PrincipalAnnouncementComposerScreen() {
  const { showToast } = useToast();
  const [tab, setTab] = useState<'compose' | 'history'>('compose');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [audience, setAudience] = useState('all');
  const [schedule, setSchedule] = useState(false);
  const [announcements, setAnnouncements] = useState(mockRecentAnnouncements);
  const [selected, setSelected] = useState<RecentAnnouncement | null>(null);

  const publish = () => {
    if (!title.trim() || !body.trim()) {
      showToast({ title: 'Title and message required', variant: 'error' });
      return;
    }
    const label = announcementAudiences.find(a => a.id === audience)?.label ?? audience;
    const newItem: RecentAnnouncement = {
      id: `ann-${Date.now()}`,
      title: title.trim(),
      audience: label,
      sentAt: schedule ? 'Scheduled' : 'Just now',
      status: schedule ? 'scheduled' : 'sent',
    };
    announcementBodies[newItem.id] = body.trim();
    setAnnouncements(prev => [newItem, ...prev]);
    setTitle('');
    setBody('');
    setTab('history');
    showToast({
      title: schedule ? 'Announcement scheduled' : 'Announcement sent',
      body: schedule ? 'It will go out at the scheduled time.' : `Delivered to ${label}.`,
    });
  };

  return (
    <>
      <AdminPageHeader title="School-wide announcements" subtitle="Compose and review messages" />

      <div className="mb-4 flex gap-2">
        {(['compose', 'history'] as const).map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              'rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
              tab === t
                ? 'bg-[var(--color-primary)] text-white'
                : 'border border-[var(--color-border)] bg-white text-[var(--color-text-secondary)]',
            )}>
            {t === 'compose' ? 'Compose' : 'History'}
          </button>
        ))}
      </div>

      {tab === 'compose' ? (
        <section className="max-w-xl flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <Input label="Title" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Sports day schedule" />
          <Textarea label="Message" value={body} onChange={e => setBody(e.target.value)} placeholder="Write your announcement…" rows={6} />
          <div>
            <label htmlFor="audience" className="mb-1 block text-sm font-medium">Audience</label>
            <select
              id="audience"
              value={audience}
              onChange={e => setAudience(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm">
              {announcementAudiences.map(a => (
                <option key={a.id} value={a.id}>{a.label}</option>
              ))}
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={schedule} onChange={e => setSchedule(e.target.checked)} />
            Schedule for later
          </label>
          <Button label={schedule ? 'Schedule' : 'Send now'} onClick={publish} />
        </section>
      ) : (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <DataTable
            data={announcements}
            keyExtractor={row => row.id}
            emptyMessage="No announcements yet."
            columns={[
              { key: 'title', header: 'Title', render: row => <span className="font-medium">{row.title}</span> },
              { key: 'audience', header: 'Audience', render: row => row.audience },
              { key: 'sent', header: 'When', render: row => row.sentAt },
              {
                key: 'status',
                header: 'Status',
                render: row => (
                  <Badge
                    label={row.status}
                    variant={row.status === 'sent' ? 'success' : row.status === 'scheduled' ? 'accent' : 'neutral'}
                  />
                ),
              },
              {
                key: 'actions',
                header: '',
                render: row => (
                  <button
                    type="button"
                    className="text-sm text-[var(--color-primary)] hover:underline"
                    onClick={() => setSelected(row)}>
                    Details
                  </button>
                ),
              },
            ]}
          />
        </div>
      )}

      <SideDrawer
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.title ?? 'Announcement'}>
        {selected ? (
          <div className="flex flex-col gap-3 text-sm">
            <p><span className="font-medium">Audience:</span> {selected.audience}</p>
            <p><span className="font-medium">Sent:</span> {selected.sentAt}</p>
            <p><span className="font-medium">Status:</span> {selected.status}</p>
            <p><span className="font-medium">Delivery (mock):</span> 94% opened · 412 recipients</p>
            <div className="mt-2 rounded-lg bg-[var(--color-background)] p-3">
              <p className="whitespace-pre-wrap text-[var(--color-text)]">
                {announcementBodies[selected.id] ?? 'Announcement body preview not available.'}
              </p>
            </div>
          </div>
        ) : null}
      </SideDrawer>
    </>
  );
}
