import { EduStationLogo } from '@/components/brand/EduStationLogo';
import { AppIcon } from '@/components/ui/AppIcon';
import { cn } from '@/lib/utils';

export type WhiteLabelPreviewProps = {
  schoolName: string;
  primaryColor: string;
  slug: string;
  logoUrl?: string;
  className?: string;
};

/**
 * G2-style preview — mobile header + web sidebar mock
 */
export function WhiteLabelPreview({
  schoolName,
  primaryColor,
  slug,
  logoUrl,
  className,
}: WhiteLabelPreviewProps) {
  const shortName = schoolName.trim().charAt(0).toUpperCase() || 'S';

  return (
    <div
      className={cn(
        'grid gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-4 md:grid-cols-2',
        className,
      )}>
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
          Mobile app header
        </p>
        <div
          className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-white shadow-sm"
          style={{ borderTopColor: primaryColor, borderTopWidth: 3 }}>
          <div
            className="flex items-center justify-between px-3 py-3"
            style={{ backgroundColor: `${primaryColor}18` }}>
            <div className="flex items-center gap-2">
              {logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={logoUrl} alt="" className="size-8 rounded-lg object-cover" />
              ) : (
                <div
                  className="flex size-8 items-center justify-center rounded-lg text-sm font-bold text-white"
                  style={{ backgroundColor: primaryColor }}>
                  {shortName}
                </div>
              )}
              <span className="max-w-[140px] truncate text-sm font-semibold">{schoolName}</span>
            </div>
            <AppIcon name="bell" size={18} className="text-[var(--color-text-secondary)]" />
          </div>
          <div className="px-3 py-4 text-xs text-[var(--color-text-secondary)]">
            Student home · branded shell
          </div>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)]">
          Web staff portal
        </p>
        <div className="flex overflow-hidden rounded-xl border border-[var(--color-border)] bg-white shadow-sm">
          <div className="w-16 shrink-0 p-2" style={{ backgroundColor: '#1A1D21' }}>
            {logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoUrl} alt="" className="mx-auto mb-2 size-8 rounded object-cover" />
            ) : (
              <div
                className="mx-auto mb-2 flex size-8 items-center justify-center rounded text-xs font-bold text-white"
                style={{ backgroundColor: primaryColor }}>
                {shortName}
              </div>
            )}
            <div className="space-y-1">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-1.5 rounded bg-white/20" />
              ))}
            </div>
          </div>
          <div className="flex-1 p-3">
            <div className="mb-2 flex items-center gap-2">
              <EduStationLogo size={20} />
              <span className="text-xs text-[var(--color-text-secondary)]">
                /s/{slug || 'your-school'}/admin
              </span>
            </div>
            <div className="h-16 rounded-lg bg-[var(--color-background)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
