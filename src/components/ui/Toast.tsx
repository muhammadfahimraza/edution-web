'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

export type ToastVariant = 'success' | 'error' | 'info';

export type ToastMessage = {
  id: string;
  title: string;
  body?: string;
  variant?: ToastVariant;
};

type ToastContextValue = {
  showToast: (message: Omit<ToastMessage, 'id'> & { id?: string }) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = useCallback(
    (message: Omit<ToastMessage, 'id'> & { id?: string }) => {
      const id = message.id ?? `toast-${Date.now()}`;
      setToast({ ...message, id, variant: message.variant ?? 'success' });
      window.setTimeout(() => {
        setToast(current => (current?.id === id ? null : current));
      }, 3500);
    },
    [],
  );

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast ? (
        <div
          role="status"
          className={cn(
            'fixed bottom-6 right-6 z-[100] max-w-sm rounded-xl border px-4 py-3 shadow-lg',
            toast.variant === 'error' && 'border-[var(--color-error)] bg-red-50',
            toast.variant === 'info' && 'border-[var(--color-border)] bg-white',
            (!toast.variant || toast.variant === 'success') &&
              'border-[var(--color-primary)] bg-[var(--color-primary-light)]',
          )}>
          <p className="text-sm font-semibold text-[var(--color-text)]">{toast.title}</p>
          {toast.body ? (
            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{toast.body}</p>
          ) : null}
        </div>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
}
