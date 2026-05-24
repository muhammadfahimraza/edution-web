'use client';

import { useState } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import {
  featureFlagLabels,
  mockSchoolFeatureFlags,
  type FeatureFlagKey,
} from '@/mocks/adminF10F17.mock';

const FLAG_KEYS = Object.keys(featureFlagLabels) as FeatureFlagKey[];

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

      <div className="overflow-x-auto rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
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
                    <button
                      type="button"
                      role="switch"
                      aria-checked={row.flags[key]}
                      aria-label={`${featureFlagLabels[key]} for ${row.schoolName}`}
                      onClick={() => toggle(row.schoolId, key)}
                      className={
                        row.flags[key]
                          ? 'inline-flex h-6 w-11 items-center rounded-full bg-[var(--color-primary)] px-0.5'
                          : 'inline-flex h-6 w-11 items-center rounded-full bg-[var(--color-border)] px-0.5'
                      }>
                      <span
                        className={
                          row.flags[key]
                            ? 'h-5 w-5 translate-x-5 rounded-full bg-white shadow transition-transform'
                            : 'h-5 w-5 translate-x-0 rounded-full bg-white shadow transition-transform'
                        }
                      />
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <DataTable
          data={rows}
          keyExtractor={row => row.schoolId}
          emptyMessage="No schools."
          columns={[
            { key: 'school', header: 'School', render: row => row.schoolName },
            {
              key: 'enabled',
              header: 'Enabled features',
              render: row =>
                FLAG_KEYS.filter(k => row.flags[k])
                  .map(k => featureFlagLabels[k])
                  .join(', ') || 'None',
            },
          ]}
        />
      </div>
    </>
  );
}
