'use client';

import { ChangeEvent, useId } from 'react';
import { AppIcon } from '@/components/ui/AppIcon';
import { formatFileSize } from '@/lib/files/readImagePreview';
import { cn } from '@/lib/utils';

export type UploadedFileMeta = {
  id: string;
  file: File;
  previewUrl?: string;
};

export type FileUploadFieldProps = {
  label: string;
  accept?: string;
  multiple?: boolean;
  hint?: string;
  files: UploadedFileMeta[];
  onFilesSelected: (files: File[]) => void;
  onRemove: (id: string) => void;
  className?: string;
};

export function FileUploadField({
  label,
  accept,
  multiple,
  hint,
  files,
  onFilesSelected,
  onRemove,
  className,
}: FileUploadFieldProps) {
  const id = useId();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const list = e.target.files;
    if (!list?.length) {
      return;
    }
    onFilesSelected(Array.from(list));
    e.target.value = '';
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-sm font-medium text-[var(--color-text)]">
        {label}
      </label>
      <input
        id={id}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
        className="text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--color-primary-light)] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[var(--color-primary-dark)]"
      />
      {hint ? <p className="text-xs text-[var(--color-text-secondary)]">{hint}</p> : null}
      {files.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {files.map(item => (
            <li
              key={item.id}
              className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-2">
              {item.previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.previewUrl}
                  alt=""
                  className="size-12 rounded object-cover"
                />
              ) : (
                <AppIcon name="paperclip" size={18} className="text-[var(--color-text-secondary)]" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.file.name}</p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {formatFileSize(item.file.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="text-xs font-medium text-[var(--color-error)] hover:underline">
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
