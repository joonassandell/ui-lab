import { AnimatePresence, m } from 'framer-motion';
import { type ButtonProps, useDynamicPayButton } from '../';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import { TRANS_SPRING, TRANS_SPRING_SLOW } from '@/lib/config';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ icon }: ButtonProps, ref) => {
    const { handleOpen, open } = useDynamicPayButton();

    return (
      <m.button
        className={cn(
          'u-flex u-items-center u-justify-center u-gap-3 u-self-start u-whitespace-nowrap u-rounded-lg u-px-3 u-py-1 u-transition-colors',
          'hover:u-text-zinc-800',
          'dark:hover:u-text-white',
          {
            'u-outline-0 before:u-absolute before:u-inset-0 dark:u-text-zinc-300/90':
              !open,
            'u-px-1': open,
          },
        )}
        layout
        onClick={handleOpen}
        ref={ref}
        transition={TRANS_SPRING}
      >
        {!open && 'Pay Now'}
        <AnimatePresence initial={false} mode="popLayout">
          <m.div
            animate={{ scale: 1 }}
            className={cn('u-flex u-items-center u-justify-center')}
            initial={{ scale: 0 }}
            key={icon.type.name}
            transition={TRANS_SPRING_SLOW}
          >
            {icon}
          </m.div>
        </AnimatePresence>
      </m.button>
    );
  },
);

Button.displayName = 'Button';
