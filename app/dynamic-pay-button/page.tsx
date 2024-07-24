'use client';

import { cn } from '@/lib/utils';
import { DynamicPayButton } from './DynamicPayButton';

export default function Page() {
  return (
    <main className={cn('grid min-h-svh place-content-center overflow-hidden')}>
      <DynamicPayButton />
    </main>
  );
}
