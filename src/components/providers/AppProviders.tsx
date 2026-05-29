'use client';

import { DemoSessionProvider } from '@/lib/demo-session/DemoSessionProvider';
import { ToastProvider } from '@/components/ui/Toast';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <DemoSessionProvider>{children}</DemoSessionProvider>
    </ToastProvider>
  );
}
