import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import type { TeacherHomework } from '@/mocks/teacher.mock';

export type HomeworkCardProps = {
  homework: TeacherHomework;
  onClick?: () => void;
  className?: string;
};

function statusVariant(status: TeacherHomework['status']) {
  if (status === 'published') return 'success' as const;
  if (status === 'draft') return 'neutral' as const;
  return 'warning' as const;
}

export function HomeworkCard({ homework, onClick, className }: HomeworkCardProps) {
  const pct =
    homework.totalStudents > 0
      ? Math.round((homework.submittedCount / homework.totalStudents) * 100)
      : 0;

  const inner = (
    <>
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-[var(--color-text)]">{homework.title}</h3>
        <Badge label={homework.status} variant={statusVariant(homework.status)} />
      </div>
      <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
        {homework.classSection} · Due {homework.dueDate}
      </p>
      <p className="mt-2 text-xs font-medium text-[var(--color-primary)]">
        {homework.submittedCount}/{homework.totalStudents} submitted ({pct}%)
      </p>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-left transition-shadow hover:shadow-md',
          className,
        )}>
        {inner}
      </button>
    );
  }

  return (
    <article
      className={cn(
        'rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4',
        className,
      )}>
      {inner}
    </article>
  );
}
