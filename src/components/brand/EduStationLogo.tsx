import { cn } from '@/lib/utils';

export type EduStationLogoProps = {
  size?: number;
  showWordmark?: boolean;
  primaryColor?: string;
  className?: string;
};

/**
 * Placeholder brand mark — swap for <Image src="..." /> when real logo is ready.
 */
export function EduStationLogo({
  size = 48,
  showWordmark = false,
  primaryColor = '#449691',
  className,
}: EduStationLogoProps) {
  return (
    <div className={cn('inline-flex flex-col items-center gap-2', className)}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        role="img"
        aria-label="Edu Station"
        className="shrink-0">
        <rect width={48} height={48} rx={12} fill={primaryColor} />
        <path
          d="M14 16h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H14V16z"
          fill="#FFFFFF"
          opacity={0.95}
        />
        <path
          d="M18 20h10M18 24h10M18 28h7"
          stroke={primaryColor}
          strokeWidth={2}
          strokeLinecap="round"
        />
        <path
          d="M30 14l4 4-4 4"
          stroke="#FFFFFF"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      {showWordmark ? (
        <span className="text-lg font-semibold text-[var(--color-text)]">
          Edu Station
        </span>
      ) : null}
    </div>
  );
}
