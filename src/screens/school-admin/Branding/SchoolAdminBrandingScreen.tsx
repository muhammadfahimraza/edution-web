'use client';

import { useEffect, useState } from 'react';
import { WhiteLabelPreview } from '@/components/admin/WhiteLabelPreview';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';
import { useDemoSession } from '@/lib/demo-session/DemoSessionProvider';
import { readFileAsDataUrl } from '@/lib/files/readImagePreview';
import { getSchoolBySlug } from '@/lib/schoolAdmin';
import { presetBrandColors } from '@/mocks/schoolAdminG1G3.mock';

export type SchoolAdminBrandingScreenProps = {
  slug: string;
};

/** G2 — Branding & white-label */
export function SchoolAdminBrandingScreen({ slug }: SchoolAdminBrandingScreenProps) {
  const school = getSchoolBySlug(slug);
  const { showToast } = useToast();
  const { getBranding, saveBranding } = useDemoSession();
  const [branding, setBranding] = useState(() => getBranding(slug));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setBranding(getBranding(slug));
  }, [getBranding, slug]);

  const handleLogoUpload = async (file: File) => {
    const logoDataUrl = await readFileAsDataUrl(file);
    setBranding(prev => ({ ...prev, logoDataUrl }));
    setSaved(false);
  };

  const save = () => {
    saveBranding(slug, branding);
    setSaved(true);
    showToast({
      title: 'Branding saved',
      body: 'Mobile app and staff portal will use these settings for this session.',
    });
  };

  return (
    <>
      <AdminPageHeader
        title="Branding & white-label"
        subtitle="Logo, colors, and live preview for mobile + web"
        actions={<Button label={saved ? 'Saved' : 'Save changes'} size="sm" onClick={save} disabled={saved} />}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="flex flex-col gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
          <h2 className="text-sm font-semibold">Brand assets</h2>

          <Input
            label="Display name"
            value={branding.displayName}
            onChange={e => {
              setBranding(prev => ({ ...prev, displayName: e.target.value }));
              setSaved(false);
            }}
          />

          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--color-text)]">School slug</label>
            <p className="rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-2 text-sm text-[var(--color-text-secondary)]">
              {slug} · read-only
            </p>
          </div>

          <div>
            <label htmlFor="logo-upload" className="mb-1 block text-sm font-medium text-[var(--color-text)]">
              Logo upload
            </label>
            <input
              id="logo-upload"
              type="file"
              accept="image/png,image/jpeg,image/svg+xml"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  void handleLogoUpload(file);
                }
              }}
              className="block w-full text-sm text-[var(--color-text-secondary)] file:mr-3 file:rounded-lg file:border-0 file:bg-[var(--color-primary-light)] file:px-3 file:py-2 file:text-sm file:font-semibold file:text-[var(--color-primary-dark)]"
            />
            {branding.logoDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={branding.logoDataUrl}
                alt="Logo preview"
                className="mt-3 h-16 w-auto max-w-full object-contain"
              />
            ) : (
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">PNG, JPG, or SVG</p>
            )}
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-[var(--color-text)]">Primary color</p>
            <div className="flex flex-wrap items-center gap-2">
              {presetBrandColors.map(color => (
                <button
                  key={color}
                  type="button"
                  aria-label={`Select color ${color}`}
                  onClick={() => {
                    setBranding(prev => ({ ...prev, primaryColor: color }));
                    setSaved(false);
                  }}
                  className="size-8 rounded-full border-2 transition-transform hover:scale-110"
                  style={{
                    backgroundColor: color,
                    borderColor: branding.primaryColor === color ? '#111' : 'transparent',
                  }}
                />
              ))}
              <input
                type="color"
                value={branding.primaryColor}
                onChange={e => {
                  setBranding(prev => ({ ...prev, primaryColor: e.target.value }));
                  setSaved(false);
                }}
                className="h-8 w-12 cursor-pointer rounded border border-[var(--color-border)]"
                aria-label="Custom primary color"
              />
            </div>
          </div>

          {school?.plan !== 'enterprise' ? (
            <p className="rounded-lg bg-[var(--color-background)] px-3 py-2 text-xs text-[var(--color-text-secondary)]">
              Full white-label (custom domain, app icon) is available on Enterprise plans.
            </p>
          ) : null}
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold">Live preview</h2>
          <WhiteLabelPreview
            schoolName={branding.displayName}
            primaryColor={branding.primaryColor}
            slug={slug}
            logoUrl={branding.logoDataUrl}
          />
        </section>
      </div>
    </>
  );
}
