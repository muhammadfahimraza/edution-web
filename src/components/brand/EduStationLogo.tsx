import Image from 'next/image';
import { cn } from '@/lib/utils';

/** Same asset as `edution-app/assets/images/edu-station-logo.png` */
export const EDU_STATION_LOGO_PATH = '/edu-station-logo.png';

export type EduStationLogoProps = {
  size?: number;
  showWordmark?: boolean;
  /** White plate behind mark + light wordmark for dark sidebars */
  onDark?: boolean;
  /** @deprecated PNG mark is not tinted; kept for call-site compatibility */
  primaryColor?: string;
  className?: string;
};

/**
 * Edu Station brand mark from `public/edu-station-logo.png` (shared with mobile app).
 */
export function EduStationLogo({
  size = 48,
  showWordmark = false,
  onDark = false,
  className,
}: EduStationLogoProps) {
  const mark = (
    <Image
      src={EDU_STATION_LOGO_PATH}
      alt="Edu Station"
      width={size}
      height={size}
      className="shrink-0 object-contain"
      priority={size >= 64}
    />
  );

  return (
    <div
      className={cn(
        'inline-flex items-center',
        showWordmark ? 'flex-row gap-2.5' : 'flex-col gap-2',
        className,
      )}
      aria-label={showWordmark ? undefined : 'Edu Station'}>
      {onDark ? (
        <div className="rounded-xl bg-white p-2 shadow-sm ring-1 ring-white/10">{mark}</div>
      ) : (
        mark
      )}
      {showWordmark ? (
        <span
          className={cn(
            'whitespace-nowrap text-lg font-semibold',
            onDark ? 'text-white' : 'text-[var(--color-text)]',
          )}>
          Edu Station
        </span>
      ) : null}
    </div>
  );
}
