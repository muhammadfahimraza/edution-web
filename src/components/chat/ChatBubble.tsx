import { cn } from '@/lib/utils';

export type ChatBubbleProps = {
  body: string;
  senderName: string;
  time: string;
  isOwn?: boolean;
};

export function ChatBubble({ body, senderName, time, isOwn }: ChatBubbleProps) {
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
        {body}
      </div>
      <span className="text-[10px] text-[var(--color-text-secondary)]">{time}</span>
    </div>
  );
}
