'use client';

import { cn } from '@/lib/utils';
import { domMax, LazyMotion } from 'framer-motion';
import { DynamicPayButton } from './DynamicPayButton';
import { Header } from '@/components/Header';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const header = useSearchParams().get('header') === 'true';

  return (
    <LazyMotion features={domMax} strict>
      {header && <Header />}
      <main
        className={cn('grid min-h-screen place-content-center overflow-hidden')}
      >
        <DynamicPayButton />
      </main>
    </LazyMotion>
  );
}
