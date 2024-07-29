import { AnimatePresence, m } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type ContentProps, useDynamicPayButton } from '../';
import { TRANS_SPRING } from '@/lib/config';

export const Content = ({ children }: ContentProps) => {
  const { open } = useDynamicPayButton();

  return (
    <div
      className={cn('ul-w-[312px] ul-p-3 ul-pt-2 empty:ul-hidden sm:ul-w-96', {
        'ul-absolute': !open,
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
