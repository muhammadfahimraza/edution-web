import Link from 'next/link';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AppIcon } from '@/components/ui/AppIcon';
import type { IconName } from '@/lib/icons';

const FEATURES: { icon: IconName; title: string; description: string }[] = [
  {
    icon: 'bookOpen',
    title: 'Homework & grades',
    description:
      'Students submit work from their phone. Teachers grade in one inbox. Parents see progress across every school.',
  },
  {
    icon: 'messageSquare',
    title: 'Moderated class chat',
    description:
      'Safe channels for teachers, students, and parents — with school policies and reporting built in.',
  },
  {
    icon: 'trophy',
    title: 'Points & rewards',
    description:
      'Merit points from classwork, quizzes, and field visits. Students redeem rewards from your school catalogue.',
  },
  {
    icon: 'users',
    title: 'Parent app',
    description:
      'One login for all children, all schools. Homework, timetable, messages, and support tickets in one place.',
  },
  {
    icon: 'palette',
    title: 'White-label branding',
    description:
      "Your logo and colours on the mobile app and web portal. Parents always know they are in your school's space.",
  },
  {
    icon: 'layoutDashboard',
    title: 'Principal dashboards',
    description:
      'Completion reports, leaderboards, and engagement metrics — without spreadsheets.',
  },
];

/**
 * E1 — Marketing landing page
 */
export function LandingScreen() {
  return (
    <PublicLayout>
      <section className="bg-gradient-to-b from-[var(--color-primary-light)] to-[var(--color-background)] px-4 py-16 md:px-6 md:py-24">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
          <Badge label="Built for schools in Pakistan" variant="primary" />
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-[var(--color-text)] md:text-5xl">
            One platform for homework, chat, rewards & family engagement
          </h1>
          <p className="max-w-2xl text-lg text-[var(--color-text-secondary)]">
            Edu Station connects your teachers, students, and parents — with a mobile app
            families love and a web portal your staff already knows how to use.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/for-schools">
              <Button label="Request a demo" size="lg" />
            </Link>
            <Link href="/login">
              <Button label="Staff sign in" variant="outline" size="lg" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Everything your school needs</h2>
          <p className="mt-2 text-[var(--color-text-secondary)]">
            From the classroom to the family home
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(feature => (
            <Card key={feature.title} className="flex flex-col gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[var(--color-primary-light)]">
                <AppIcon name={feature.icon} size={22} className="text-[var(--color-primary)]" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-[var(--color-text-secondary)]">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-primary)] px-4 py-16 text-white md:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">Ready to bring Edu Station to your school?</h2>
          <p className="max-w-xl text-white/85">
            Tell us about your school and we will set up a branded demo with your logo and colours.
          </p>
          <Link href="/for-schools">
            <Button
              label="Get started"
              size="lg"
              className="bg-white text-[var(--color-primary)] hover:bg-white/90"
            />
          </Link>
        </div>
      </section>
    </PublicLayout>
  );
}

function div({ className, children }: { className?: string; children?: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}
