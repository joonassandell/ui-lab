import { AnimatePresence, m } from 'framer-motion';
import { type ButtonProps, useDynamicPayButton } from './';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import { TRANS_SPRING, TRANS_SPRING_SLOW } from '@/lib/config';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ icon }: ButtonProps, ref) => {
    const { handleOpen, open } = useDynamicPayButton();

    return (
      <m.button
        className={cn(
          'flex cursor-default select-none items-center justify-center gap-3 self-start whitespace-nowrap rounded-lg px-3 py-1 transition-colors',
          'hover:text-zinc-800',
          'dark:hover:text-zinc-100',
          {
            'outline-0 dark:text-zinc-300': !open,
            'px-1': open,
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
            className={cn('flex size-5 items-center justify-center')}
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
