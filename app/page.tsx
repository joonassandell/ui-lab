import { cn } from '@/lib/utils';
import { DynamicPayButton } from './dynamic-pay-button';
import Link from 'next/link';

export default function Home() {
  return (
    <main
      className={cn(
        'u-grid u-gap-6 u-overflow-hidden u-px-6 u-pb-6 u-pt-16 lg:u-grid-cols-2',
      )}
    >
      <div
        className={cn(
          'u-flex u-h-[calc(100svh-theme(spacing[24]))] u-min-h-96 u-flex-col u-rounded-lg u-border',
          'u-border-zinc-300 dark:u-border-zinc-700/40',
        )}
      >
        <div className={cn('u-grid u-flex-1 u-place-content-center')}>
          <DynamicPayButton />
        </div>
        <div
          className={cn(
            'u-flex u-justify-center u-border-t u-p-4 u-text-sm',
            'u-border-t-zinc-300 dark:u-border-t-zinc-700/40',
          )}
        >
          <Link href="/dynamic-pay-button">Dynamic Pay Button</Link>
        </div>
      </div>
    </main>
  );
}
