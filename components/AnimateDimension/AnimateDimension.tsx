'use client';

import { cn } from '@/lib/utils';
import { type HTMLMotionProps, m, type Variant } from 'framer-motion';
import { type PropsWithChildren, useEffect, useRef, useState } from 'react';
import { TRANS_SPRING } from '@/lib/config';

export const AnimateDimension = ({
  animate,
  children,
  className,
  initial,
  onAnimationComplete,
  onAnimationStart,
  onUpdate,
  refClassname,
  triggerEventsOnMount = false,
  variants,
  ...props
}: HTMLMotionProps<'div'> &
  PropsWithChildren & {
    animate?: 'open' | 'closed';
    refClassname?: string;
    triggerEventsOnMount?: boolean;
    variants: {
      closed: Variant;
      open: Variant;
    };
  }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [{ height, width }, setDimensions] = useState<{
    height: 'auto' | number;
    width: 'auto' | number;
  }>({
    height: 'auto',
    width: 'auto',
  });

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      const observedHeight = entries[0].contentRect.height;
      const observedWidth = entries[0].contentRect.width;
      setDimensions({
        height: observedHeight,
        width: observedWidth,
      });
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  const [mountEvents, setMountEvents] = useState(triggerEventsOnMount);
  useEffect(() => {
    if (animate === 'open' && !mountEvents) {
      setMountEvents(true);
    }
  }, [animate, mountEvents]);

  const variantsWithDimensions = {
    closed: {
      height,
      width,
      ...variants.closed,
    },
    open: {
      height,
      width,
      ...variants.open,
    },
  };

  return (
    <m.div
      animate={animate}
      className={cn(className)}
      initial={initial ?? 'closed'}
      style={{ height, width }}
      transition={TRANS_SPRING}
      variants={variantsWithDimensions}
      {...(mountEvents && {
        onAnimationComplete,
        onAnimationStart,
        onUpdate,
      })}
      {...props}
    >
      <div className={cn(refClassname)} ref={containerRef}>
        {children}
      </div>
    </m.div>
  );
};
