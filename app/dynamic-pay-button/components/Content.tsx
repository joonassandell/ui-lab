import { AnimatePresence, m } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type ContentProps, useDynamicPayButton } from '../';
import { TRANS_SPRING } from '@/lib/config';

export const Content = ({ children }: ContentProps) => {
  const { open } = useDynamicPayButton();

  return (
    <div
      className={cn('u-w-[312px] u-p-3 u-pt-2 empty:u-hidden sm:u-w-96', {
        'u-absolute': !open,
      })}
    >
      <AnimatePresence mode="popLayout">
        {open && (
          <m.div
            animate="open"
            exit="exit"
            initial="closed"
            style={{ originY: 'bottom' }}
            transition={TRANS_SPRING}
            variants={{
              closed: {
                opacity: 0,
                scaleX: 0.66,
              },
              exit: {
                opacity: 0,
                scaleX: 0.66,
              },
              open: {
                opacity: 1,
                scaleX: 1,
              },
            }}
          >
            {children}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};
