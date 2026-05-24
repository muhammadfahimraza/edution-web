'use client';

import { cn } from '@/lib/utils';
import { ClipboardEvent, KeyboardEvent, useRef } from 'react';

const DEFAULT_LENGTH = 6;

export type OtpInputProps = {
  length?: number;
  value: string;
  onChange: (code: string) => void;
  error?: string;
};

export function OtpInput({
  length = DEFAULT_LENGTH,
  value,
  onChange,
  error,
}: OtpInputProps) {
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const chars = Array.from({ length }, (_, i) => value[i] ?? '');

  const setCode = (next: string) => {
    onChange(next.replace(/\D/g, '').slice(0, length));
  };

  const handleChange = (index: number, text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length === 0) {
      const arr = [...chars];
      arr[index] = '';
      setCode(arr.join(''));
      return;
    }
    if (cleaned.length > 1) {
      setCode(cleaned);
      const focusIndex = Math.min(cleaned.length, length) - 1;
      inputs.current[Math.max(focusIndex, 0)]?.focus();
      return;
    }
    const arr = [...chars];
    arr[index] = cleaned;
    setCode(arr.join(''));
    if (index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !chars[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    if (pasted) {
      setCode(pasted);
      inputs.current[Math.min(pasted.length, length) - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center gap-2" role="group" aria-label="One-time password">
        {chars.map((char, index) => (
          <input
            key={index}
            ref={el => {
              inputs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            maxLength={1}
            value={char}
            aria-label={`Digit ${index + 1}`}
            onChange={e => handleChange(index, e.target.value)}
            onKeyDown={e => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className={cn(
              'size-12 rounded-lg border bg-white text-center text-lg font-semibold',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[var(--color-primary)]',
              error ? 'border-[var(--color-error)]' : 'border-[var(--color-border)]',
            )}
          />
        ))}
      </div>
      {error ? <p className="text-center text-xs text-[var(--color-error)]">{error}</p> : null}
    </div>
  );
}
