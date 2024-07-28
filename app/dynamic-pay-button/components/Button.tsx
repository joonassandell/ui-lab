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
          'ul-flex ul-items-center ul-justify-center ul-gap-3 ul-self-start ul-whitespace-nowrap ul-rounded-lg ul-px-3 ul-py-1 ul-transition-colors',
          'hover:ul-text-zinc-800',
          'dark:hover:ul-text-white',
          {
            'ul-outline-0 before:ul-absolute before:ul-inset-0 dark:ul-text-zinc-300/90':
              !open,
            'ul-px-1': open,
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
            className={cn('ul-flex ul-items-center ul-justify-center')}
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
