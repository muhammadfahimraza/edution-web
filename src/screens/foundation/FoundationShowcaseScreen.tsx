'use client';

import { useState } from 'react';
import { EduStationLogo } from '@/components/brand/EduStationLogo';
import { Badge, Button, Card, Input, Spinner } from '@/components/ui';

/**
 * Order 0 — UI foundation preview (not a product screen).
 */
export function FoundationShowcaseScreen() {
  const [loadingDemo, setLoadingDemo] = useState(false);

  return (
    <div className="mx-auto flex min-h-full max-w-lg flex-col gap-4 p-4 pb-12">
      <header className="flex flex-col items-center gap-2 py-4 text-center">
        <EduStationLogo size={64} showWordmark />
        <p className="text-sm text-[var(--color-text-secondary)]">
          Design system foundation — replace logo when ready
        </p>
      </header>

      <Card className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Buttons</h2>
        <div className="flex flex-col gap-2">
          <Button label="Primary" fullWidth />
          <Button label="Secondary" variant="secondary" fullWidth />
          <Button label="Outline" variant="outline" fullWidth />
          <Button label="Ghost" variant="ghost" fullWidth />
          <Button
            label={loadingDemo ? 'Loading…' : 'Toggle loading state'}
            loading={loadingDemo}
            fullWidth
            onClick={() => setLoadingDemo(v => !v)}
          />
        </div>
      </Card>

      <Card className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Input</h2>
        <Input
          label="Phone number"
          placeholder="+880 1XXX XXXXXX"
          hint="Mock field — no validation wired"
        />
        <Input
          label="With error"
          placeholder="Student ID"
          error="Example error state"
        />
      </Card>

      <Card className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Badges</h2>
        <div className="flex flex-wrap gap-2">
          <Badge label="Primary" />
          <Badge label="Points" variant="accent" />
          <Badge label="Success" variant="success" />
        </div>
      </Card>

      <Card className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Typography</h2>
        <h1 className="text-3xl font-bold">Heading 1</h1>
        <h2 className="text-2xl font-semibold">Heading 2</h2>
        <p className="text-base">Body text for Edu Station.</p>
        <p className="text-xs text-[var(--color-text-secondary)]">
          Caption / secondary
        </p>
      </Card>

      <Card>
        <Spinner label="Loading state" />
      </Card>
    </div>
  );
}
