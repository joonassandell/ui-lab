'use client';

import { domMax, LazyMotion } from 'framer-motion';
import { DynamicPayButton } from './DynamicPayButton';

export default function Page() {
  return (
    <LazyMotion features={domMax} strict>
      <DynamicPayButton />
    </LazyMotion>
  );
}
