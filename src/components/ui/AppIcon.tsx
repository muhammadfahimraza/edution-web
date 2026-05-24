import { cn } from '@/lib/utils';
import { ICON_MAP, type IconName } from '@/lib/icons';

export type AppIconProps = {
  name: IconName;
  size?: number;
  className?: string;
  color?: string;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
};

export function AppIcon({
  name,
  size = 20,
  className,
  color,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
}: AppIconProps) {
  const Icon = ICON_MAP[name];
  return (
    <Icon
      size={size}
      color={color}
      className={cn('shrink-0', className)}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden ?? (ariaLabel ? undefined : true)}
    />
  );
}
