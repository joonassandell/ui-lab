import { AnimatePresence, m } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type ContentProps, useDynamicPayButton } from '../';
import { TRANS_SPRING } from '@/lib/config';

export const Content = ({ children }: ContentProps) => {
  const { open } = useDynamicPayButton();

  return (
    <AnimatePresence mode="popLayout">
      {open && (
        <m.div
          animate="open"
          className={cn('ul-w-[308px] ul-p-3 sm:ul-w-96', {
            'ul-absolute ul-top-14': !open,
          })}
          exit="closed"
          initial="closed"
          style={{ originY: 'bottom' }}
          transition={TRANS_SPRING}
          variants={{
            closed: {
              rotate: 20,
              scale: 0.2,
            },
            open: {
              rotate: 0,
              scale: 1,
            },
          }}
        >
          {children}
        </m.div>
      )}
    </AnimatePresence>
  );
};
