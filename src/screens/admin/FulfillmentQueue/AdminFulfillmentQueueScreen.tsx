'use client';

import { useMemo, useState } from 'react';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  mockFulfillmentOrders,
  type FulfillmentOrder,
  type FulfillmentStatus,
} from '@/mocks/adminF10F17.mock';

const COLUMNS: { status: FulfillmentStatus; label: string }[] = [
  { status: 'pending', label: 'Pending' },
  { status: 'processing', label: 'Processing' },
  { status: 'shipped', label: 'Shipped' },
  { status: 'delivered', label: 'Delivered' },
];

const NEXT_STATUS: Partial<Record<FulfillmentStatus, FulfillmentStatus>> = {
  pending: 'processing',
  processing: 'shipped',
  shipped: 'delivered',
};

/**
 * F11 — Fulfillment queue: Kanban-style columns by status
 */
export function AdminFulfillmentQueueScreen() {
  const [orders, setOrders] = useState(mockFulfillmentOrders);

  const byStatus = useMemo(() => {
    const map: Record<FulfillmentStatus, FulfillmentOrder[]> = {
      pending: [],
      processing: [],
      shipped: [],
      delivered: [],
    };
    for (const o of orders) {
      map[o.status].push(o);
    }
    return map;
  }, [orders]);

  const advance = (id: string) => {
    setOrders(prev =>
      prev.map(o => {
        const next = NEXT_STATUS[o.status];
        if (o.id !== id || !next) return o;
        return { ...o, status: next };
      }),
    );
  };

  return (
    <>
      <AdminPageHeader
        title="Fulfillment queue"
        subtitle="Reward redemptions awaiting processing"
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {COLUMNS.map(col => (
          <section
            key={col.status}
            className="flex flex-col rounded-xl border border-[var(--color-border)] bg-[var(--color-background)]">
            <header className="flex items-center justify-between border-b border-[var(--color-border)] px-3 py-3">
              <h2 className="text-sm font-semibold text-[var(--color-text)]">{col.label}</h2>
              <Badge label={String(byStatus[col.status].length)} variant="neutral" />
            </header>
            <ul className="flex flex-1 flex-col gap-2 p-2">
              {byStatus[col.status].map(order => (
                <li
                  key={order.id}
                  className="rounded-lg border border-[var(--color-border)] bg-white p-3 text-sm shadow-sm">
                  <p className="font-medium text-[var(--color-text)]">{order.rewardName}</p>
                  <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                    {order.studentName} · {order.schoolName}
                  </p>
                  <p className="mt-1 text-xs">{order.pointsSpent} pts · {order.orderedAt}</p>
                  {NEXT_STATUS[order.status] ? (
                    <Button
                      label={`→ ${NEXT_STATUS[order.status]}`}
                      size="sm"
                      variant="ghost"
                      className="mt-2"
                      onClick={() => advance(order.id)}
                    />
                  ) : null}
                </li>
              ))}
              {byStatus[col.status].length === 0 ? (
                <li className="py-6 text-center text-xs text-[var(--color-text-secondary)]">Empty</li>
              ) : null}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
