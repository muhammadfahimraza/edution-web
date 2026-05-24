import Link from 'next/link';
import { EduStationLogo } from '@/components/brand/EduStationLogo';

export function PublicFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <EduStationLogo size={36} showWordmark />
            <p className="max-w-xs text-sm text-[var(--color-text-secondary)]">
              Connecting schools, students, and families across Pakistan and beyond.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="mb-3 text-sm font-semibold">Product</p>
              <ul className="flex flex-col gap-2 text-sm text-[var(--color-text-secondary)]">
                <li>
                  <Link href="/for-schools" className="hover:text-[var(--color-primary)]">
                    For schools
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-[var(--color-primary)]">
                    Staff login
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold">Legal</p>
              <ul className="flex flex-col gap-2 text-sm text-[var(--color-text-secondary)]">
                <li>
                  <Link href="/legal/privacy" className="hover:text-[var(--color-primary)]">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/terms" className="hover:text-[var(--color-primary)]">
                    Terms of service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold">Contact</p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                hello@edustation.pk
              </p>
            </div>
          </div>
        </div>

        <p className="mt-10 border-t border-[var(--color-border)] pt-6 text-center text-xs text-[var(--color-text-secondary)]">
          © {new Date().getFullYear()} Edu Station. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
