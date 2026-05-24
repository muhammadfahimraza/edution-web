'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { AppIcon } from '@/components/ui/AppIcon';
import { schoolTeacherBasePath } from '@/lib/schoolPortal';
import { teacherClassOptions } from '@/mocks/teacher.mock';

export function TeacherCreateHomeworkScreen({ slug }: { slug: string }) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [classSection, setClassSection] = useState(teacherClassOptions[0]);
  const [dueDate, setDueDate] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);

  const addAttachment = () => {
    setAttachments(prev => [...prev, `attachment_${prev.length + 1}.pdf`]);
  };

  const publish = (draft: boolean) => {
    if (!title.trim()) {
      alert('Title is required.');
      return;
    }
    alert(draft ? 'Homework saved as draft (mock).' : 'Homework published (mock).');
    router.push(schoolTeacherBasePath(slug) + '/homework');
  };

  return (
    <>
      <AdminPageHeader title="Create homework" subtitle="Form with instructions and attachments" />

      <div className="max-w-2xl flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <Input label="Title" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Chapter 5 exercises" />
        <div>
          <label htmlFor="class" className="mb-1 block text-sm font-medium">Class</label>
          <select
            id="class"
            value={classSection}
            onChange={e => setClassSection(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm">
            {teacherClassOptions.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <Input label="Due date" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
        <Textarea label="Instructions" value={instructions} onChange={e => setInstructions(e.target.value)} rows={5} placeholder="What should students submit?" />
        <div>
          <p className="mb-2 text-sm font-medium">Attachments</p>
          <input
            type="file"
            multiple
            onChange={() => addAttachment()}
            className="text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--color-primary-light)] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[var(--color-primary-dark)]"
          />
          {attachments.length > 0 ? (
            <ul className="mt-2 text-sm text-[var(--color-text-secondary)]">
              {attachments.map(a => (
                <li key={a} className="flex items-center gap-2">
                  <AppIcon name="paperclip" size={14} className="text-[var(--color-text-secondary)]" />
                  {a}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="flex gap-2 pt-2">
          <Button label="Save draft" variant="outline" onClick={() => publish(true)} />
          <Button label="Publish" onClick={() => publish(false)} />
        </div>
      </div>
    </>
  );
}
