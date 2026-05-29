import { cn } from '@/lib/utils';
import type { ChatAttachment } from '@/mocks/teacher.mock';

export type ChatBubbleProps = {
  body: string;
  senderName: string;
  time: string;
  isOwn?: boolean;
  attachment?: ChatAttachment;
};

export function ChatBubble({ body, senderName, time, isOwn, attachment }: ChatBubbleProps) {
  return (
    <div className={cn('flex flex-col gap-0.5', isOwn ? 'items-end' : 'items-start')}>
      {!isOwn ? (
        <span className="text-xs font-medium text-[var(--color-text-secondary)]">{senderName}</span>
      ) : null}
      <div
        className={cn(
          'max-w-[85%] rounded-2xl px-4 py-2 text-sm',
          isOwn
            ? 'rounded-br-md bg-[var(--color-primary)] text-white'
            : 'rounded-bl-md border border-[var(--color-border)] bg-white text-[var(--color-text)]',
        )}>
        {attachment?.previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={attachment.previewUrl}
            alt={attachment.name}
            className="mb-2 max-h-40 rounded-lg object-cover"
          />
        ) : null}
        {body ? <p>{body}</p> : null}
        {attachment && !attachment.previewUrl ? (
          <p className={cn('text-xs', isOwn ? 'text-white/80' : 'text-[var(--color-text-secondary)]')}>
            📎 {attachment.name}
          </p>
        ) : null}
      </div>
      <span className="text-[10px] text-[var(--color-text-secondary)]">{time}</span>
    </div>
  );
}
