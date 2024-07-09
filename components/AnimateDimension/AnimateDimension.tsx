'use client';

import { cn } from '@/lib/utils';
import { type HTMLMotionProps, m, type Variant } from 'framer-motion';
import { type PropsWithChildren, useEffect, useRef, useState } from 'react';
import { TRANS_SPRING } from '@/lib/config';

export const AnimateDimension = ({
  animate,
  children,
  className,
  refClassname,
  variants,
  ...props
}: HTMLMotionProps<'div'> &
  PropsWithChildren & {
    refClassname?: string;
    variants: {
      closed: Variant;
      open: Variant;
    };
  }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number | 'auto'>('auto');
  const [width, setWidth] = useState<number | 'auto'>('auto');

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver(entries => {
        const observedHeight = entries[0].contentRect.height;
        const observedWidth = entries[0].contentRect.width;
        setHeight(observedHeight);
        setWidth(observedWidth);
      });

      resizeObserver.observe(containerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

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
      style={{ height, width }}
      transition={TRANS_SPRING}
      variants={variantsWithDimensions}
      {...props}
    >
      <div className={cn(refClassname)} ref={containerRef}>
        {children}
      </div>
    </m.div>
  );
};
