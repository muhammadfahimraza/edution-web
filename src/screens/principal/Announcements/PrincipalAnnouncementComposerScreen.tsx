'use client';

import { useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { announcementAudiences, mockRecentAnnouncements } from '@/mocks/principal.mock';

export function PrincipalAnnouncementComposerScreen() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [audience, setAudience] = useState('all');
  const [schedule, setSchedule] = useState(false);
  const [announcements, setAnnouncements] = useState(mockRecentAnnouncements);

  const publish = () => {
    if (!title.trim() || !body.trim()) {
      alert('Title and message are required.');
      return;
    }
    const label = announcementAudiences.find(a => a.id === audience)?.label ?? audience;
    setAnnouncements(prev => [
      {
        id: `ann-${Date.now()}`,
        title: title.trim(),
        audience: label,
        sentAt: schedule ? 'Scheduled' : 'Just now',
        status: schedule ? 'scheduled' : 'sent',
      },
      ...prev,
    ]);
    setTitle('');
    setBody('');
    alert(schedule ? 'Announcement scheduled (mock).' : 'Announcement sent to school (mock).');
  };

  return (
    <>
      <AdminPageHeader title="School-wide announcements" subtitle="Compose and send messages" />

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <h2 className="text-sm font-semibold">New announcement</h2>
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

        <section>
          <h2 className="mb-3 text-sm font-semibold">Recent announcements</h2>
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
              ]}
            />
          </div>
        </section>
      </div>
    </>
  );
}
