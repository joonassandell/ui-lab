'use client';

import {
  AnimatePresence,
  type HTMLMotionProps,
  m,
  type Variant,
} from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TRANS_SPRING, TRANS_SPRING_SLOW } from '@/lib/config';

export const DynamicPayButton = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(false);
  const [icon, setIcon] = useState(<CreditCard />);

  const handleOpen = useCallback(() => {
    setOpen(!open);
    setContent(true);
    setIcon(open ? <CreditCard /> : <Close />);
  }, [open]);

  return (
    <AnimateDimension
      animate={open ? 'open' : 'closed'}
      className={cn(
        'relative flex flex-col items-center overflow-hidden bg-zinc-50 text-sm font-medium text-slate-500 shadow-pop dark:bg-zinc-900 dark:text-slate-50',
      )}
      initial="closed"
      onAnimationComplete={() => !open && content && setContent(false)}
      refClassname={cn('flex flex-col items-center')}
      variants={{
        closed: {
          borderRadius: 60,
        },
        open: {
          borderRadius: 16,
        },
      }}
    >
      <div className={cn('flex w-full items-center justify-between px-3 py-3')}>
        <AnimatePresence mode="popLayout">
          {open && (
            <m.nav
              animate={{ opacity: 1, x: '0%' }}
              className={cn('flex gap-2')}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0, x: '50%' }}
              transition={TRANS_SPRING}
            >
              <button
                className={cn(
                  'whitespace-nowrap rounded-md px-2 py-1 dark:bg-zinc-800',
                )}
              >
                Credit card
              </button>
              <button className={cn('whitespace-nowrap rounded-md px-2 py-1')}>
                Other methods
              </button>
            </m.nav>
          )}
        </AnimatePresence>
        <m.button
          className={cn(
            'flex cursor-default select-none items-center justify-center gap-3 self-start overflow-hidden whitespace-nowrap px-2 py-1 focus-visible:outline-none',
          )}
          layout
          onClick={handleOpen}
          transition={TRANS_SPRING}
        >
          {!open && 'Pay Now'}
          <AnimatePresence initial={false} mode="popLayout">
            <m.span
              animate={{ scale: 1 }}
              className={cn('flex w-5 items-center justify-center')}
              exit={{ scale: 0 }}
              initial={{ scale: 0 }}
              key={icon.type.name}
              transition={TRANS_SPRING_SLOW}
            >
              {icon}
            </m.span>
          </AnimatePresence>
        </m.button>
      </div>
      {content && (
        <m.div
          animate={open ? 'open' : 'closed'}
          className={cn('top-14 w-96 p-3 pt-0', { absolute: !open })}
          initial="closed"
          style={{
            originY: 'top',
          }}
          transition={{
            ...TRANS_SPRING,
            filter: {
              delay: 0.2,
            },
          }}
          variants={{
            closed: {
              filter: 'blur(4px)',
              opacity: 0,
              scaleX: 0.75,
            },
            open: {
              filter: 'blur(0px)',
              opacity: 1,
              scaleX: 1,
            },
          }}
        >
          <div
            className={cn(
              'shadow-l h-48 rounded-xl border p-3 dark:border-zinc-700 dark:bg-zinc-800',
            )}
          >
            Labore aliqua sint ullamco amet. Mollit duis id eu. Aliquip dolor
            est non sit laborum excepteur. Cillum irure nostrud irure. Eu
            aliquip reprehenderit in incididunt officia et dolor occaecat ipsum
            et fugiat exercitation commodo.
          </div>
        </m.div>
      )}
    </AnimateDimension>
  );
};

const CreditCard = () => (
  <svg
    fill="none"
    height="24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect height="14" rx="2" width="20" x="2" y="5" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

const Close = () => (
  <svg
    fill="none"
    height="24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

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
