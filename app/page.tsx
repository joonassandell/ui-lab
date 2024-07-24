import { cn } from '@/lib/utils';
import { DynamicPayButton } from './dynamic-pay-button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={cn('grid gap-6 px-6 pb-6 pt-16 lg:grid-cols-2')}>
      <div
        className={cn(
          'flex h-[calc(100svh-theme(spacing[24]))] min-h-96 flex-col rounded-lg border',
          'border-zinc-300 dark:border-zinc-700/40',
        )}
      >
        <div className={cn('grid flex-1 place-content-center')}>
          <DynamicPayButton />
        </div>
        <div
          className={cn(
            'flex justify-center border-t p-4 text-sm',
            'border-t-zinc-300 dark:border-t-zinc-700/40',
          )}
        >
          <Link href="/dynamic-pay-button">Dynamic Pay Button</Link>
        </div>
      </div>
    </main>
  );
}
