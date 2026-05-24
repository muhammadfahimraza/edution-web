'use client';

import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export type ChatComposerProps = {
  onSend: (message: string) => void;
  placeholder?: string;
  className?: string;
};

export function ChatComposer({
  onSend,
  placeholder = 'Type a message…',
  className,
}: ChatComposerProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'flex gap-2 border-t border-[var(--color-border)] bg-white p-3',
        className,
      )}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder={placeholder}
        className="min-h-10 flex-1 rounded-xl border border-[var(--color-border)] px-4 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--color-primary)]"
      />
      <Button type="submit" label="Send" size="sm" />
    </form>
  );
}
