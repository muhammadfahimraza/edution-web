'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { StepIndicator } from '@/components/admin/StepIndicator';
import { WhiteLabelPreview } from '@/components/admin/WhiteLabelPreview';
import { AdminPageHeader } from '@/components/layout/admin/AdminPageHeader';
import { Button } from '@/components/ui/Button';
import { AppIcon } from '@/components/ui/AppIcon';
import { Input } from '@/components/ui/Input';
import {
  isSlugAvailable,
  planOptions,
  slugifySchoolName,
  type AdminPlanTier,
} from '@/mocks/adminPlatform.mock';
import { cn } from '@/lib/utils';

const WIZARD_STEPS = [
  { id: 'info', label: 'School info' },
  { id: 'slug', label: 'URL slug' },
  { id: 'branding', label: 'Branding' },
  { id: 'plan', label: 'Plan' },
] as const;

type WizardStepId = (typeof WIZARD_STEPS)[number]['id'];

const DEFAULT_PRIMARY = '#2563EB';

/**
 * F3 — School onboarding: info → slug → branding preview → plan
 */
export function AdminSchoolOnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState<WizardStepId>('info');
  const [schoolName, setSchoolName] = useState('');
  const [country, setCountry] = useState('Pakistan');
  const [contactEmail, setContactEmail] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [primaryColor, setPrimaryColor] = useState(DEFAULT_PRIMARY);
  const [selectedPlan, setSelectedPlan] = useState<AdminPlanTier>('growth');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!slugTouched && schoolName) {
      setSlug(slugifySchoolName(schoolName));
    }
  }, [schoolName, slugTouched]);

  const slugOk = useMemo(() => isSlugAvailable(slug), [slug]);
  const stepIndex = WIZARD_STEPS.findIndex(s => s.id === step);

  const goNext = () => {
    const next = WIZARD_STEPS[stepIndex + 1];
    if (next) {
      setStep(next.id);
    }
  };

  const goBack = () => {
    const prev = WIZARD_STEPS[stepIndex - 1];
    if (prev) {
      setStep(prev.id);
    }
  };

  const validateStep = (): string | undefined => {
    if (step === 'info') {
      if (!schoolName.trim()) return 'School name is required';
      if (!contactEmail.includes('@')) return 'Valid contact email is required';
      return undefined;
    }
    if (step === 'slug') {
      if (!slug.trim()) return 'Slug is required';
      if (!slugOk) return 'This slug is already taken';
      return undefined;
    }
    return undefined;
  };

  const handleContinue = (e: FormEvent) => {
    e.preventDefault();
    const err = validateStep();
    if (err) {
      alert(err);
      return;
    }
    if (step === 'plan') {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        alert(
          `School created (mock)\n\n${schoolName}\n/s/${slug}\nPlan: ${selectedPlan}`,
        );
        router.push('/admin/schools');
      }, 900);
      return;
    }
    goNext();
  };

  return (
    <>
      <AdminPageHeader
        title="Add school"
        subtitle="Onboarding wizard — UI demo with mock persistence"
        actions={
          <Link href="/admin/schools">
            <Button label="Cancel" variant="outline" size="sm" />
          </Link>
        }
      />

      <StepIndicator steps={[...WIZARD_STEPS]} currentStep={step} />

      <form
        onSubmit={handleContinue}
        className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        {step === 'info' ? (
          <div className="mx-auto max-w-lg flex flex-col gap-4">
            <Input
              label="School name"
              value={schoolName}
              onChange={e => setSchoolName(e.target.value)}
              placeholder="e.g. Green Valley International"
              required
            />
            <Input
              label="Country"
              value={country}
              onChange={e => setCountry(e.target.value)}
            />
            <Input
              label="Primary contact email"
              type="email"
              value={contactEmail}
              onChange={e => setContactEmail(e.target.value)}
              placeholder="principal@school.edu.pk"
              hint="Invitation email sent after provisioning (future API)."
            />
          </div>
        ) : null}

        {step === 'slug' ? (
          <div className="mx-auto max-w-lg flex flex-col gap-4">
            <Input
              label="URL slug"
              value={slug}
              onChange={e => {
                setSlugTouched(true);
                setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''));
              }}
              hint={`Staff portal: edustation.pk/s/${slug || 'your-school'}/admin`}
              error={slug && !slugOk ? 'Slug already in use' : undefined}
            />
            {slug && slugOk ? (
              <p className="flex items-center gap-2 text-sm text-[var(--color-success)]">
                <AppIcon name="check" size={16} />
                Slug is available
              </p>
            ) : null}
            <button
              type="button"
              className="text-left text-sm text-[var(--color-primary)] hover:underline"
              onClick={() => {
                setSlugTouched(false);
                setSlug(slugifySchoolName(schoolName));
              }}>
              Regenerate from school name
            </button>
          </div>
        ) : null}

        {step === 'branding' ? (
          <div className="flex flex-col gap-6">
            <div className="mx-auto max-w-xs w-full">
              <label className="text-sm font-medium text-[var(--color-text)]">
                Primary brand color
              </label>
              <div className="mt-2 flex items-center gap-3">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={e => setPrimaryColor(e.target.value)}
                  className="size-12 cursor-pointer rounded-lg border border-[var(--color-border)]"
                />
                <Input
                  value={primaryColor}
                  onChange={e => setPrimaryColor(e.target.value)}
                  placeholder="#2563EB"
                />
              </div>
            </div>
            <WhiteLabelPreview
              schoolName={schoolName || 'Your School'}
              primaryColor={primaryColor}
              slug={slug}
            />
          </div>
        ) : null}

        {step === 'plan' ? (
          <div className="grid gap-4 md:grid-cols-3">
            {planOptions.map(plan => {
              const selected = selectedPlan === plan.tier;
              return (
                <button
                  key={plan.tier}
                  type="button"
                  onClick={() => setSelectedPlan(plan.tier)}
                  className={cn(
                    'flex flex-col rounded-xl border p-5 text-left transition-colors',
                    selected
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)] ring-2 ring-[var(--color-primary)]'
                      : 'border-[var(--color-border)] bg-white hover:border-[var(--color-primary)]',
                  )}>
                  <span className="text-lg font-bold text-[var(--color-text)]">
                    {plan.label}
                  </span>
                  <span className="mt-1 text-sm text-[var(--color-text-secondary)]">
                    {plan.priceLabel}
                  </span>
                  <span className="mt-2 text-sm font-medium">
                    Up to {plan.seats.toLocaleString()} seats
                  </span>
                  <ul className="mt-3 flex flex-col gap-1 text-sm text-[var(--color-text-secondary)]">
                    {plan.features.map(f => (
                      <li key={f}>· {f}</li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        ) : null}

        <div className="mt-8 flex justify-between border-t border-[var(--color-border)] pt-6">
          <Button
            type="button"
            label="Back"
            variant="ghost"
            disabled={stepIndex === 0}
            onClick={goBack}
          />
          <Button
            type="submit"
            label={step === 'plan' ? 'Create school' : 'Continue'}
            loading={submitting}
          />
        </div>
      </form>
    </>
  );
}
