import { cn } from '@/lib/utils';
import type { TicketMessage } from '@/mocks/sharedK.mock';

export type TicketThreadProps = {
  messages: TicketMessage[];
  className?: string;
};

export function TicketThread({ messages, className }: TicketThreadProps) {
  return (
    <ul className={cn('flex flex-col gap-4', className)}>
      {messages.map(msg => (
        <li
          key={msg.id}
          className={cn(
            'rounded-xl border px-4 py-3 text-sm',
            msg.role === 'system'
              ? 'border-dashed border-[var(--color-border)] bg-[var(--color-background)] text-center text-[var(--color-text-secondary)]'
              : msg.role === 'staff'
                ? 'ml-8 border-[var(--color-primary)]/30 bg-[var(--color-primary-light)]/40'
                : 'mr-8 border-[var(--color-border)] bg-white',
          )}>
          {msg.role !== 'system' ? (
            <p className="mb-1 text-xs font-semibold text-[var(--color-text-secondary)]">
              {msg.author}
              <span className="ml-2 font-normal capitalize">· {msg.role}</span>
            </p>
          ) : null}
          <p className="text-[var(--color-text)]">{msg.body}</p>
          {msg.role !== 'system' ? (
            <p className="mt-2 text-xs text-[var(--color-text-secondary)]">{msg.sentAt}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
