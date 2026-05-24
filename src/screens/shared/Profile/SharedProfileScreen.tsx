'use client';

import { useState } from 'react';
import { FormSection } from '@/components/admin/FormSection';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { getStaffProfile } from '@/mocks/sharedK.mock';

/** K2 — User profile / change password */
export function SharedProfileScreen({ slug }: { slug: string }) {
  const profile = getStaffProfile(slug);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saved, setSaved] = useState(false);

  const changePassword = () => {
    if (!currentPassword || !newPassword) {
      alert('Fill in all password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match.');
      return;
    }
    setSaved(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    alert('Password updated (mock).');
  };

  return (
    <>
      <AdminPageHeader title="Profile" subtitle={profile.schoolName} />

      <FormSection title="Account" className="mb-6">
        <dl className="space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-[var(--color-text-secondary)]">Name</dt>
            <dd>{profile.name}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[var(--color-text-secondary)]">Email</dt>
            <dd>{profile.email}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[var(--color-text-secondary)]">Role</dt>
            <dd>{profile.role}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-[var(--color-text-secondary)]">Phone</dt>
            <dd>{profile.phone}</dd>
          </div>
        </dl>
      </FormSection>

      <FormSection title="Change password">
        <div className="flex max-w-md flex-col gap-3">
          <Input
            label="Current password"
            type="password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Input
            label="New password"
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            autoComplete="new-password"
          />
          <Input
            label="Confirm new password"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
          <Button label={saved ? 'Updated' : 'Update password'} onClick={changePassword} disabled={saved} />
        </div>
      </FormSection>
    </>
  );
}

function div({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}
