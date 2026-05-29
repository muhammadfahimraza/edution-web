'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { FileUploadField, type UploadedFileMeta } from '@/components/forms/FileUploadField';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useToast } from '@/components/ui/Toast';
import { readFileAsDataUrl } from '@/lib/files/readImagePreview';
import { schoolTeacherBasePath } from '@/lib/schoolPortal';
import { teacherClassOptions } from '@/mocks/teacher.mock';

export function TeacherCreateHomeworkScreen({ slug }: { slug: string }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [classSection, setClassSection] = useState(teacherClassOptions[0]);
  const [dueDate, setDueDate] = useState('');
  const [attachments, setAttachments] = useState<UploadedFileMeta[]>([]);

  const handleFilesSelected = async (files: File[]) => {
    const next: UploadedFileMeta[] = [];
    for (const file of files) {
      const previewUrl = file.type.startsWith('image/')
        ? await readFileAsDataUrl(file)
        : undefined;
      next.push({
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        file,
        previewUrl,
      });
    }
    setAttachments(prev => [...prev, ...next]);
  };

  const publish = (draft: boolean) => {
    if (!title.trim()) {
      showToast({ title: 'Title required', body: 'Add a homework title before saving.', variant: 'error' });
      return;
    }
    showToast({
      title: draft ? 'Draft saved' : 'Homework published',
      body: `${title.trim()} · Grade ${classSection}${attachments.length ? ` · ${attachments.length} attachment(s)` : ''}`,
    });
    router.push(schoolTeacherBasePath(slug) + '/homework');
  };

  return (
    <>
      <AdminPageHeader title="Create homework" subtitle="Form with instructions and attachments" />

      <div className="max-w-2xl flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <Input label="Title" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Chapter 5 exercises" />
        <div>
          <label htmlFor="class" className="mb-1 block text-sm font-medium">
            Class
          </label>
          <select
            id="class"
            value={classSection}
            onChange={e => setClassSection(e.target.value)}
            className="w-full rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm">
            {teacherClassOptions.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <Input label="Due date" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
        <Textarea
          label="Instructions"
          value={instructions}
          onChange={e => setInstructions(e.target.value)}
          rows={5}
          placeholder="What should students submit?"
        />
        <FileUploadField
          label="Attachments"
          multiple
          accept=".pdf,image/*,.doc,.docx"
          files={attachments}
          onFilesSelected={files => void handleFilesSelected(files)}
          onRemove={id => setAttachments(prev => prev.filter(a => a.id !== id))}
          hint="PDF, images, or Word documents"
        />
        <div className="flex gap-2 pt-2">
          <Button label="Save draft" variant="outline" onClick={() => publish(true)} />
          <Button label="Publish" onClick={() => publish(false)} />
        </div>
      </div>
    </>
  );
}
