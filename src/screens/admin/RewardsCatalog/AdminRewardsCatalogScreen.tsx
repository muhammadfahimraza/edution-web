'use client';

import { useMemo, useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { mockRewardSkus, type RewardSku } from '@/mocks/adminF10F17.mock';
import { RewardCard } from '@/components/shared/RewardCard';

function categoryVariant(cat: RewardSku['category']) {
  if (cat === 'physical') return 'primary' as const;
  if (cat === 'digital') return 'accent' as const;
  return 'neutral' as const;
}

/** F10 — Rewards catalog */
export function AdminRewardsCatalogScreen() {
  const [skus, setSkus] = useState(mockRewardSkus);
  const [query, setQuery] = useState('');
  const [view, setView] = useState<'grid' | 'table'>('grid');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return skus;
    return skus.filter(s => s.name.toLowerCase().includes(q) || s.category.includes(q));
  }, [query, skus]);

  const toggleActive = (id: string) => {
    setSkus(prev => prev.map(s => (s.id === id ? { ...s, active: !s.active } : s)));
  };

  return (
    <>
      <AdminPageHeader
        title="Rewards catalog"
        subtitle="Platform-wide SKUs redeemable with student points"
        actions={<Button label="Add SKU" size="sm" onClick={() => alert('Add SKU — UI demo.')} />}
      />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="max-w-md flex-1">
          <Input label="Search SKUs" placeholder="Name or category…" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {(['grid', 'table'] as const).map(v => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={
                view === v
                  ? 'rounded-full bg-[var(--color-primary)] px-4 py-1.5 text-sm font-semibold text-white'
                  : 'rounded-full border border-[var(--color-border)] bg-white px-4 py-1.5 text-sm font-medium text-[var(--color-text-secondary)]'
              }>
              {v === 'grid' ? 'Grid' : 'Table'}
            </button>
          ))}
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(sku => (
            <RewardCard
              key={sku.id}
              id={sku.id}
              name={sku.name}
              icon={sku.icon}
              category={sku.category}
              pointsCost={sku.pointsCost}
              stock={sku.stock}
              active={sku.active}
              onToggleActive={toggleActive}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          <DataTable
            data={filtered}
            keyExtractor={row => row.id}
            emptyMessage="No SKUs match."
            columns={[
              { key: 'name', header: 'SKU', render: row => <span className="font-medium">{row.name}</span> },
              { key: 'cat', header: 'Category', render: row => <Badge label={row.category} variant={categoryVariant(row.category)} /> },
              { key: 'pts', header: 'Points', render: row => row.pointsCost },
              { key: 'stock', header: 'Stock', render: row => (row.stock === 999 ? '∞' : row.stock) },
              { key: 'active', header: 'Status', render: row => <Badge label={row.active ? 'Active' : 'Inactive'} variant={row.active ? 'success' : 'neutral'} /> },
              { key: 'actions', header: '', render: row => (
                <button type="button" className="text-sm text-[var(--color-primary)] hover:underline" onClick={() => toggleActive(row.id)}>Toggle</button>
              )},
            ]}
          />
        </div>
      )}
    </>
  );
}
