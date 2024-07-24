'use client';

import { cn } from '@/lib/utils';
import { DynamicPayButton } from './DynamicPayButton';
import { Header } from '@/components/Header';

export default function Page() {
  return (
    <>
      <Header queryParamOnly />
      <main
        className={cn('grid min-h-screen place-content-center overflow-hidden')}
      >
        <DynamicPayButton />
      </main>
    </>
  );
}
