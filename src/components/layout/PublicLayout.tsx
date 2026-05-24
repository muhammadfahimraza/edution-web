import { PublicFooter } from '@/components/layout/PublicFooter';
import { PublicHeader } from '@/components/layout/PublicHeader';

export type PublicLayoutProps = {
  children: React.ReactNode;
  headerVariant?: 'default' | 'dark';
  showFooter?: boolean;
};

export function PublicLayout({
  children,
  headerVariant = 'default',
  showFooter = true,
}: PublicLayoutProps) {
  return (
    <div className="flex min-h-full flex-col">
      <PublicHeader variant={headerVariant} />
      <main className="flex-1">{children}</main>
      {showFooter ? <PublicFooter /> : null}
    </div>
  );
}
