'use client';

import { useMemo, useState, type DragEvent } from 'react';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
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

const DRAG_MIME = 'application/x-fulfillment-order-id';

/**
 * F11 — Fulfillment queue: Kanban-style columns by status (drag-and-drop between columns)
 */
export function AdminFulfillmentQueueScreen() {
  const [orders, setOrders] = useState(mockFulfillmentOrders);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<FulfillmentStatus | null>(null);

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

  const moveToStatus = (orderId: string, status: FulfillmentStatus) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId && o.status !== status ? { ...o, status } : o)),
    );
  };

  const advance = (id: string) => {
    setOrders(prev =>
      prev.map(o => {
        const next = NEXT_STATUS[o.status];
        if (o.id !== id || !next) return o;
        return { ...o, status: next };
      }),
    );
  };

  const clearDragState = () => {
    setDraggingId(null);
    setDropTarget(null);
  };

  const handleDragStart = (orderId: string) => (e: DragEvent) => {
    e.dataTransfer.setData(DRAG_MIME, orderId);
    e.dataTransfer.effectAllowed = 'move';
    setDraggingId(orderId);
  };

  const handleColumnDragOver = (status: FulfillmentStatus) => (e: DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDropTarget(status);
  };

  const handleColumnDrop = (status: FulfillmentStatus) => (e: DragEvent) => {
    e.preventDefault();
    const orderId = e.dataTransfer.getData(DRAG_MIME);
    if (orderId) moveToStatus(orderId, status);
    clearDragState();
  };

  return (
    <>
      <AdminPageHeader
        title="Fulfillment queue"
        subtitle="Drag cards between columns or use the quick advance action"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {COLUMNS.map(col => {
          const isDropTarget = dropTarget === col.status && draggingId !== null;
          return (
            <section
              key={col.status}
              onDragOver={handleColumnDragOver(col.status)}
              onDragEnter={handleColumnDragOver(col.status)}
              onDragLeave={e => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setDropTarget(current => (current === col.status ? null : current));
                }
              }}
              onDrop={handleColumnDrop(col.status)}
              className={cn(
                'flex min-h-[280px] flex-col rounded-xl border bg-[var(--color-background)] transition-colors',
                isDropTarget
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)]/40 ring-2 ring-[var(--color-primary)]/30'
                  : 'border-[var(--color-border)]',
              )}>
              <header className="flex items-center justify-between border-b border-[var(--color-border)] px-3 py-3">
                <h2 className="text-sm font-semibold text-[var(--color-text)]">{col.label}</h2>
                <Badge label={String(byStatus[col.status].length)} variant="neutral" />
              </header>
              <ul className="flex flex-1 flex-col gap-2 p-2">
                {byStatus[col.status].map(order => (
                  <li
                    key={order.id}
                    draggable
                    onDragStart={handleDragStart(order.id)}
                    onDragEnd={clearDragState}
                    className={cn(
                      'rounded-lg border border-[var(--color-border)] bg-white p-3 text-sm shadow-sm md:cursor-grab md:active:cursor-grabbing',
                      draggingId === order.id && 'opacity-45 ring-2 ring-[var(--color-primary)]/40',
                    )}>
                    <p className="font-medium text-[var(--color-text)]">{order.rewardName}</p>
                    <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                      {order.studentName} · {order.schoolName}
                    </p>
                    <p className="mt-1 text-xs">{order.pointsSpent} pts · {order.orderedAt}</p>
                    <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                      {NEXT_STATUS[order.status] ? (
                        <Button
                          label={`→ ${NEXT_STATUS[order.status]}`}
                          size="sm"
                          variant="ghost"
                          onClick={() => advance(order.id)}
                        />
                      ) : null}
                      <label className="flex flex-col gap-1 text-xs md:hidden">
                        <span className="font-medium text-[var(--color-text-secondary)]">Move to</span>
                        <select
                          value={order.status}
                          onChange={e => moveToStatus(order.id, e.target.value as FulfillmentStatus)}
                          className="rounded-lg border border-[var(--color-border)] bg-white px-2 py-2 text-sm">
                          {COLUMNS.map(c => (
                            <option key={c.status} value={c.status}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  </li>
                ))}
                {byStatus[col.status].length === 0 ? (
                  <li
                    className={cn(
                      'flex flex-1 items-center justify-center rounded-lg border border-dashed py-8 text-center text-xs text-[var(--color-text-secondary)]',
                      isDropTarget && 'border-[var(--color-primary)] text-[var(--color-primary)]',
                    )}>
                    {isDropTarget ? 'Drop here' : 'Empty'}
                  </li>
                ) : null}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
