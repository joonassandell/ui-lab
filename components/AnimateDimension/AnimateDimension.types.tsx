import { type HTMLMotionProps, type Variant } from 'framer-motion';
import { type ReactNode } from 'react';

export interface AnimateDimensionProps extends HTMLMotionProps<'div'> {
  animate?: 'open' | 'closed';
  children: ReactNode;
  containerClassName?: string;
  triggerEventsOnMount?: boolean;
  variants?: {
    closed: Variant;
    open: Variant;
  };
}
