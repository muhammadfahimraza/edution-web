import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { getLegalDocument } from '@/mocks/publicContent.mock';

export type LegalScreenProps = {
  slug: string;
};

/**
 * E7 — Privacy & Terms legal pages
 */
export function LegalScreen({ slug }: LegalScreenProps) {
  const doc = getLegalDocument(slug);
  if (!doc) {
    notFound();
  }

  return (
    <PublicLayout>
      <article className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-medium text-[var(--color-primary)] hover:underline">
          ← Back to home
        </Link>
        <header className="mb-8 border-b border-[var(--color-border)] pb-6">
          <h1 className="text-3xl font-bold">{doc.title}</h1>
          <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
            Last updated {doc.updatedAt}
          </p>
          <nav className="mt-4 flex gap-4 text-sm">
            <Link
              href="/legal/privacy"
              className={
                slug === 'privacy'
                  ? 'font-semibold text-[var(--color-primary)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
              }>
              Privacy
            </Link>
            <Link
              href="/legal/terms"
              className={
                slug === 'terms'
                  ? 'font-semibold text-[var(--color-primary)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
              }>
              Terms
            </Link>
          </nav>
        </header>
        <div className="flex flex-col gap-8">
          {doc.sections.map(section => (
            <section key={section.title}>
              <h2 className="mb-2 text-lg font-semibold">{section.title}</h2>
              <p className="leading-relaxed text-[var(--color-text-secondary)]">{section.body}</p>
            </section>
          ))}
        </div>
      </article>
    </PublicLayout>
  );
}
