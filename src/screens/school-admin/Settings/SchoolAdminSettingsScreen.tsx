'use client';

import { useState } from 'react';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import {
  chatPolicyLabels,
  defaultSchoolSettings,
  timezoneOptions,
  type ChatPolicySettings,
  type SchoolSettings,
} from '@/mocks/schoolAdminG4G12.mock';
import { useToast } from '@/components/ui/Toast';

/** G12 — School settings */
export function SchoolAdminSettingsScreen() {
  const { showToast } = useToast();
  const [settings, setSettings] = useState<SchoolSettings>(defaultSchoolSettings);
  const [saved, setSaved] = useState(false);

  const toggleChat = (key: keyof ChatPolicySettings) => {
    setSettings(prev => ({
      ...prev,
      chat: { ...prev.chat, [key]: !prev.chat[key] },
    }));
    setSaved(false);
  };

  const save = () => {
    setSaved(true);
    showToast({ title: 'Settings saved', body: 'Chat policies and timezone updated for this session.' });
  };

  return (
    <>
      <AdminPageHeader
        title="School settings"
        subtitle="Timezone and chat policy"
        actions={<Button label={saved ? 'Saved' : 'Save'} size="sm" onClick={save} disabled={saved} />}
      />

      <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h2 className="text-sm font-semibold">Timezone</h2>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">Used for homework due dates and announcements</p>
        <select
          value={settings.timezone}
          onChange={e => {
            setSettings(prev => ({ ...prev, timezone: e.target.value }));
            setSaved(false);
          }}
          className="mt-3 w-full max-w-xs rounded-lg border border-[var(--color-border)] bg-white px-3 py-2 text-sm">
          {timezoneOptions.map(tz => (
            <option key={tz} value={tz}>{tz}</option>
          ))}
        </select>
      </section>

      <section className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h2 className="text-sm font-semibold">Chat policies</h2>
        <ul className="mt-4 flex flex-col divide-y divide-[var(--color-border)]">
          {(Object.keys(chatPolicyLabels) as (keyof ChatPolicySettings)[]).map(key => {
            const meta = chatPolicyLabels[key];
            const on = settings.chat[key];
            return (
              <li key={key} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                <div>
                  <p className="font-medium text-sm">{meta.label}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{meta.description}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  onClick={() => toggleChat(key)}
                  className={
                    on
                      ? 'inline-flex h-6 w-11 shrink-0 items-center rounded-full bg-[var(--color-primary)] px-0.5'
                      : 'inline-flex h-6 w-11 shrink-0 items-center rounded-full bg-[var(--color-border)] px-0.5'
                  }>
                  <span className={on ? 'h-5 w-5 translate-x-5 rounded-full bg-white shadow' : 'h-5 w-5 rounded-full bg-white shadow'} />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
}
