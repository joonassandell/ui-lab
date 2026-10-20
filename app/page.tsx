import { cn } from '@/lib/utils';
import { DynamicPayButton } from './dynamic-pay-button';
import { Header } from '@/components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />
      <main
        className={cn(
          'u:grid u:gap-6 u:overflow-hidden u:px-6 u:pt-16 u:pb-6 u:lg:grid-cols-2',
        )}
      >
        <div
          className={cn(
            'u:flex u:h-[calc(100svh-(--spacing(24)))] u:min-h-96 u:flex-col u:rounded-lg u:border',
            'u:border-zinc-300 u:dark:border-zinc-700/40',
          )}
        >
          <div className={cn('u:grid u:flex-1 u:place-content-center')}>
            <DynamicPayButton />
          </div>
          <div
            className={cn(
              'u:flex u:justify-center u:border-t u:p-4 u:text-sm',
              'u:border-t-zinc-300 u:dark:border-t-zinc-700/40',
            )}
          >
            <Link href="/dynamic-pay-button?header=true">
              Dynamic Pay Button
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
