import { cn } from '@/lib/utils';
import { AppIcon } from '@/components/ui/AppIcon';

export type StepIndicatorProps = {
  steps: { id: string; label: string }[];
  currentStep: string;
};

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  const currentIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <ol className="flex flex-wrap gap-2 md:gap-0 md:divide-x md:divide-[var(--color-border)] md:rounded-xl md:border md:border-[var(--color-border)] md:bg-[var(--color-surface)]">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep;
        const isComplete = index < currentIndex;
        return (
          <li
            key={step.id}
            className={cn(
              'flex flex-1 items-center gap-2 px-4 py-3 text-sm',
              isActive && 'bg-[var(--color-primary-light)] font-semibold text-[var(--color-primary-dark)]',
              isComplete && !isActive && 'text-[var(--color-success)]',
              !isActive && !isComplete && 'text-[var(--color-text-secondary)]',
            )}>
            <span
              className={cn(
                'flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                isActive && 'bg-[var(--color-primary)] text-white',
                isComplete && !isActive && 'bg-[var(--color-success)] text-white',
                !isActive && !isComplete && 'bg-[var(--color-border)] text-[var(--color-text-secondary)]',
              )}>
              {isComplete ? <AppIcon name="check" size={14} className="text-white" /> : index + 1}
            </span>
            <span className="hidden sm:inline">{step.label}</span>
          </li>
        );
      })}
    </ol>
  );
}
