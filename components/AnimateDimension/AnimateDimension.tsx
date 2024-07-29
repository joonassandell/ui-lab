'use client';

import { type AnimateDimensionProps } from './';
import { cn } from '@/lib/utils';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { m } from 'framer-motion';
import { TRANS_SPRING } from '@/lib/config';

export const AnimateDimension = forwardRef<
  HTMLDivElement,
  AnimateDimensionProps
>(
  (
    {
      animate = 'closed',
      children,
      className,
      containerClassName,
      initial = 'closed',
      onAnimationComplete,
      onAnimationStart,
      onUpdate,
      triggerEventsOnMount = false,
      variants,
      ...props
    }: AnimateDimensionProps,
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [{ height, width }, setDimensions] = useState<{
      height: 'fit-content' | number;
      width: 'fit-content' | number;
    }>({
      height: 'fit-content',
      width: 'fit-content',
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

    const mountEvents = useRef(triggerEventsOnMount);
    useEffect(() => {
      if (animate === 'open' && !mountEvents.current) {
        mountEvents.current = true;
      }
    }, [animate]);

    const variantsWithDimensions = {
      closed: {
        height,
        width,
        ...variants?.closed,
      },
      open: {
        height,
        width,
        ...variants?.open,
      },
    };

    return (
      <m.div
        animate={animate}
        className={cn(className)}
        initial={initial}
        ref={ref}
        transition={TRANS_SPRING}
        variants={variantsWithDimensions}
        {...(mountEvents.current && {
          onAnimationComplete,
          onAnimationStart,
          onUpdate,
        })}
        {...props}
      >
        <div
          className={cn('ul-h-fit ul-w-fit', containerClassName)}
          ref={containerRef}
        >
          {children}
        </div>
      </m.div>
    );
  },
);

AnimateDimension.displayName = 'AnimateDimension';
