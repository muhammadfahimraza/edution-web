'use client';

import { Suspense, type ReactNode } from 'react';

export function ReportSuspense({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <p className="py-12 text-center text-sm text-[var(--color-text-secondary)]">
          Loading report…
        </p>
      }
    >
      {children}
    </Suspense>
  );
}
