import type { ReactNode } from 'react';

/** UI phase: always renders children. Later: check session role claims. */
export function AnalyticsGuard({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
