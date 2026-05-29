'use client';

import { useState } from 'react';
import { TicketThread } from '@/components/shared/TicketThread';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { useToast } from '@/components/ui/Toast';
import { useDemoSession } from '@/lib/demo-session/DemoSessionProvider';

function statusVariant(s: string) {
  if (s === 'escalated') return 'error' as const;
  if (s === 'resolved') return 'success' as const;
  if (s === 'in_progress') return 'accent' as const;
  return 'warning' as const;
}

/** K1 — Ticket detail (school side) */
export function SharedTicketDetailScreen({ ticketId }: { ticketId: string }) {
  const { showToast } = useToast();
  const { getTicket, appendTicketReply, escalateTicket } = useDemoSession();
  const ticket = getTicket(ticketId);
  const [reply, setReply] = useState('');

  if (!ticket) {
    return <p className="text-sm text-[var(--color-error)]">Ticket not found.</p>;
  }

  const sendReply = () => {
    if (!reply.trim()) {
      return;
    }
    appendTicketReply(ticketId, reply.trim());
    showToast({ title: 'Reply sent', body: 'Your message was added to the ticket thread.' });
    setReply('');
  };

  const handleEscalate = () => {
    escalateTicket(ticketId);
    showToast({
      title: 'Ticket escalated',
      body: 'Edu Station platform support will follow up.',
    });
  };

  return (
    <>
      <AdminPageHeader
        title={ticket.subject}
        subtitle={`${ticket.category} · ${ticket.requester}`}
        actions={<Badge label={ticket.status.replace('_', ' ')} variant={statusVariant(ticket.status)} />}
      />

      {ticket.escalated ? (
        <p className="mb-4 rounded-lg border border-[var(--color-error)]/40 bg-[var(--color-error)]/10 px-4 py-3 text-sm font-medium text-[var(--color-error)]">
          Escalated to Edu Station support
        </p>
      ) : null}

      <dl className="mb-6 grid gap-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-[var(--color-text-secondary)]">Created</dt>
          <dd>{ticket.createdAt}</dd>
        </div>
        <div>
          <dt className="text-[var(--color-text-secondary)]">Priority</dt>
          <dd className="capitalize">{ticket.priority}</dd>
        </div>
      </dl>

      <TicketThread messages={ticket.messages} className="mb-6" />

      {ticket.status !== 'resolved' ? (
        <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <Textarea
            label="Reply"
            value={reply}
            onChange={e => setReply(e.target.value)}
            rows={3}
            placeholder="Write a reply to the requester…"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <Button label="Send reply" size="sm" onClick={sendReply} disabled={!reply.trim()} />
            {!ticket.escalated ? (
              <Button label="Escalate to platform" size="sm" variant="outline" onClick={handleEscalate} />
            ) : null}
          </div>
        </section>
      ) : null}
    </>
  );
}
