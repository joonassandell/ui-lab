'use client';

import { cn } from '@/lib/utils';
import { DynamicPayButton } from './DynamicPayButton';

export default function Page() {
  return (
    <main
      className={cn(
        'ul-grid ul-min-h-svh ul-place-content-center ul-overflow-hidden',
      )}
    >
      <DynamicPayButton />
    </main>
  );
}
