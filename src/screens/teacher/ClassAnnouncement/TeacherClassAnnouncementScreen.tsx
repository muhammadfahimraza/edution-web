'use client';

import { useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { classAnnouncementAudiences, mockClassAnnouncements } from '@/mocks/teacher.mock';

export function TeacherClassAnnouncementScreen() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [classSection, setClassSection] = useState(classAnnouncementAudiences[0].id);
  const [announcements, setAnnouncements] = useState(mockClassAnnouncements);

  const send = () => {
    if (!title.trim()) {
      alert('Title is required.');
      return;
    }
    const label = classAnnouncementAudiences.find(a => a.id === classSection)?.label ?? classSection;
    setAnnouncements(prev => [
      { id: `ca-${Date.now()}`, title: title.trim(), classSection: label, sentAt: 'Just now' },
      ...prev,
    ]);
    setTitle('');
    setBody('');
    alert('Announcement sent to class (mock).');
  };

  return (
    <>
      <AdminPageHeader title="Class announcement" subtitle="Message one of your classes" />

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <h2 className="text-sm font-semibold">Compose</h2>
          <div>
            <label htmlFor="audience" className="mb-1 block text-sm font-medium">Class</label>
            <select
              id="audience"
              value={classSection}
              onChange={e => setClassSection(e.target.value)}
              className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm">
              {classAnnouncementAudiences.map(a => (
                <option key={a.id} value={a.id}>{a.label}</option>
              ))}
            </select>
          </div>
          <Input label="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <Textarea label="Message" value={body} onChange={e => setBody(e.target.value)} rows={4} />
          <Button label="Send to class" onClick={send} />
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold">Sent to your classes</h2>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
            <DataTable
              data={announcements}
              keyExtractor={row => row.id}
              emptyMessage="No announcements yet."
              columns={[
                { key: 'title', header: 'Title', render: row => <span className="font-medium">{row.title}</span> },
                { key: 'class', header: 'Class', render: row => row.classSection },
                { key: 'sent', header: 'Sent', render: row => row.sentAt },
              ]}
            />
          </div>
        </section>
      </div>
    </>
  );
}
