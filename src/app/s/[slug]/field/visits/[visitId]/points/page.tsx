import { Suspense } from 'react';
import { FieldPointsConfirmScreen } from '@/screens/field/PointsConfirm/FieldPointsConfirmScreen';

type PageProps = { params: Promise<{ slug: string; visitId: string }> };

export default async function FieldPointsPage({ params }: PageProps) {
  const { slug, visitId } = await params;
  return (
    <Suspense fallback={<p className="text-sm text-[var(--color-text-secondary)]">Loading…</p>}>
      <FieldPointsConfirmScreen slug={slug} visitId={visitId} />
    </Suspense>
  );
}
