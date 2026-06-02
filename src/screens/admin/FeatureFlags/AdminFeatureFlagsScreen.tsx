'use client';

import { useState } from 'react';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import {
  featureFlagLabels,
  mockSchoolFeatureFlags,
  type FeatureFlagKey,
} from '@/mocks/adminF10F17.mock';
import { cn } from '@/lib/utils';

const FLAG_KEYS = Object.keys(featureFlagLabels) as FeatureFlagKey[];

function FlagSwitch({
  checked,
  label,
  onToggle,
}: {
  checked: boolean;
  label: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onToggle}
      className={
        checked
          ? 'inline-flex h-6 w-11 shrink-0 items-center rounded-full bg-[var(--color-primary)] px-0.5'
          : 'inline-flex h-6 w-11 shrink-0 items-center rounded-full bg-[var(--color-border)] px-0.5'
      }>
      <span
        className={cn(
          'h-5 w-5 rounded-full bg-white shadow transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0',
        )}
      />
    </button>
  );
}

/** F16 — Feature flags per school */
export function AdminFeatureFlagsScreen() {
  const [rows, setRows] = useState(mockSchoolFeatureFlags);

  const toggle = (schoolId: string, key: FeatureFlagKey) => {
    setRows(prev =>
      prev.map(row =>
        row.schoolId === schoolId
          ? { ...row, flags: { ...row.flags, [key]: !row.flags[key] } }
          : row,
      ),
    );
  };

  return (
    <>
      <AdminPageHeader
        title="Feature flags"
        subtitle="Enable or disable platform features per school"
      />

      <div className="flex flex-col gap-3 lg:hidden">
        {rows.map(row => (
          <article
            key={row.schoolId}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
            <h3 className="mb-3 font-semibold text-[var(--color-text)]">{row.schoolName}</h3>
            <ul className="space-y-3">
              {FLAG_KEYS.map(key => (
                <li key={key} className="flex items-center justify-between gap-3">
                  <span className="text-sm text-[var(--color-text-secondary)]">
                    {featureFlagLabels[key]}
                  </span>
                  <FlagSwitch
                    checked={row.flags[key]}
                    label={`${featureFlagLabels[key]} for ${row.schoolName}`}
                    onToggle={() => toggle(row.schoolId, key)}
                  />
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] lg:block">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-background)]">
              <th className="px-4 py-3 font-semibold">School</th>
              {FLAG_KEYS.map(key => (
                <th key={key} className="px-3 py-3 text-center font-semibold">
                  {featureFlagLabels[key]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => (
              <tr key={row.schoolId} className="border-b border-[var(--color-border)] last:border-0">
                <td className="px-4 py-3 font-medium">{row.schoolName}</td>
                {FLAG_KEYS.map(key => (
                  <td key={key} className="px-3 py-3 text-center">
                    <FlagSwitch
                      checked={row.flags[key]}
                      label={`${featureFlagLabels[key]} for ${row.schoolName}`}
                      onToggle={() => toggle(row.schoolId, key)}
                    />
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
