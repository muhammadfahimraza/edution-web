'use client';

import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { AppIcon } from '@/components/ui/AppIcon';
import { cn } from '@/lib/utils';
import type { ChatAttachment } from '@/mocks/teacher.mock';
import { readFileAsDataUrl } from '@/lib/files/readImagePreview';

export type ChatComposerProps = {
  onSend: (message: string, attachment?: ChatAttachment) => void;
  placeholder?: string;
  className?: string;
};

export function ChatComposer({
  onSend,
  placeholder = 'Type a message…',
  className,
}: ChatComposerProps) {
  const [text, setText] = useState('');
  const [pendingAttachment, setPendingAttachment] = useState<ChatAttachment | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed && !pendingAttachment) {
      return;
    }
    onSend(trimmed || pendingAttachment?.name || 'Attachment', pendingAttachment ?? undefined);
    setText('');
    setPendingAttachment(null);
  };

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const previewUrl = file.type.startsWith('image/') ? await readFileAsDataUrl(file) : undefined;
    setPendingAttachment({
      name: file.name,
      previewUrl,
      mimeType: file.type,
    });
    e.target.value = '';
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'flex flex-col gap-2 border-t border-[var(--color-border)] bg-white p-3',
        className,
      )}>
      {pendingAttachment ? (
        <div className="flex items-center gap-2 rounded-lg bg-[var(--color-background)] px-3 py-2 text-xs">
          {pendingAttachment.previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={pendingAttachment.previewUrl} alt="" className="size-10 rounded object-cover" />
          ) : (
            <AppIcon name="paperclip" size={16} />
          )}
          <span className="flex-1 truncate">{pendingAttachment.name}</span>
          <button
            type="button"
            className="text-[var(--color-error)] hover:underline"
            onClick={() => setPendingAttachment(null)}>
            Remove
          </button>
        </div>
      ) : null}
      <div className="flex gap-2">
        <input ref={fileRef} type="file" accept="image/*,.pdf" className="hidden" onChange={e => void handleFile(e)} />
        <button
          type="button"
          aria-label="Attach file"
          onClick={() => fileRef.current?.click()}
          className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-background)]">
          <AppIcon name="paperclip" size={18} />
        </button>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={placeholder}
          className="min-h-10 flex-1 rounded-xl border border-[var(--color-border)] px-4 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)]"
        />
        <Button type="submit" label="Send" size="sm" />
      </div>
    </form>
  );
}
