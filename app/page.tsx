import { cn } from '@/lib/utils';
import { DynamicPayButton } from './dynamic-pay-button';
import Link from 'next/link';

export default function Home() {
  return (
    <main
      className={cn(
        'ul-grid ul-gap-6 ul-px-6 ul-pb-6 ul-pt-16 lg:ul-grid-cols-2',
      )}
    >
      <div
        className={cn(
          'ul-flex ul-h-[calc(100svh-theme(spacing[24]))] ul-min-h-96 ul-flex-col ul-rounded-lg ul-border',
          'ul-border-zinc-300 dark:ul-border-zinc-700/40',
        )}
      >
        <div className={cn('ul-grid ul-flex-1 ul-place-content-center')}>
          <DynamicPayButton />
        </div>
        <div
          className={cn(
            'ul-flex ul-justify-center ul-border-t ul-p-4 ul-text-sm',
            'ul-border-t-zinc-300 dark:ul-border-t-zinc-700/40',
          )}
        >
          <Link href="/dynamic-pay-button">Dynamic Pay Button</Link>
        </div>
      </div>
    </main>
  );
}
