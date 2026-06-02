import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export type DataTableColumn<T> = {
  key: string;
  header: string;
  className?: string;
  /** Hide this field in mobile card layout */
  hideOnMobile?: boolean;
  render: (row: T) => ReactNode;
};

export type DataTableProps<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  emptyMessage?: string;
  mobileCardRender?: (row: T) => ReactNode;
};

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  emptyMessage = 'No rows to display.',
  mobileCardRender,
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-[var(--color-text-secondary)]">
        {emptyMessage}
      </p>
    );
  }

  const mobileColumns = columns.filter(col => !col.hideOnMobile);

  return (
    <>
      <div className="flex flex-col gap-3 lg:hidden">
        {data.map(row => (
          <article
            key={keyExtractor(row)}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm">
            {mobileCardRender ? (
              mobileCardRender(row)
            ) : (
              <dl className="space-y-3">
                {mobileColumns.map(col => (
                  <div key={col.key}>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
                      {col.header}
                    </dt>
                    <dd className="mt-0.5 text-sm text-[var(--color-text)]">{col.render(row)}</dd>
                  </div>
                ))}
              </dl>
            )}
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-background)]">
              {columns.map(col => (
                <th
                  key={col.key}
                  className={cn(
                    'px-4 py-3 font-semibold text-[var(--color-text-secondary)]',
                    col.className,
                  )}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr
                key={keyExtractor(row)}
                className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-background)]">
                {columns.map(col => (
                  <td key={col.key} className={cn('px-4 py-3 align-middle', col.className)}>
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
