import { AnimatePresence, m } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type ContentProps, useDynamicPayButton } from './';
import { TRANS_SPRING } from '@/lib/config';

export const Content = ({ children }: ContentProps) => {
  const { open } = useDynamicPayButton();

  return (
    <AnimatePresence mode="popLayout">
      {open && (
        <m.div
          animate="open"
          className={cn('w-[368px] p-3 md:w-96', {
            absolute: !open,
            'top-14': !open,
          })}
          exit="closed"
          initial="closed"
          style={{ originY: 'bottom' }}
          transition={{
            ...TRANS_SPRING,
            filter: { delay: 0.2 },
          }}
          variants={{
            closed: {
              filter: 'blur(4px)',
              opacity: 0,
              rotate: 20,
              scale: 0.2,
            },
            open: {
              filter: 'blur(0px)',
              opacity: 1,
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
