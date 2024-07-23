'use client';

import { cn } from '@/lib/utils';
import { domMax, LazyMotion } from 'framer-motion';
import { DynamicPayButton } from './DynamicPayButton';
import { Header } from '@/components/Header';

export default function Page() {
  return (
    <LazyMotion features={domMax} strict>
      <Header queryParamOnly />
      <main
        className={cn('grid min-h-screen place-content-center overflow-hidden')}
      >
        <DynamicPayButton />
      </main>
    </LazyMotion>
  );
}
