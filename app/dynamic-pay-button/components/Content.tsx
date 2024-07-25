import { AnimatePresence, m } from 'framer-motion';
import { cn } from '@/lib/utils';
import { type ContentProps, useDynamicPayButton } from '../';
import { TRANS_SPRING } from '@/lib/config';
import { useEffect, useState } from 'react';

export const Content = ({ children }: ContentProps) => {
  const { open } = useDynamicPayButton();
  const [present, setPresent] = useState(open);

  useEffect(() => {
    if (open) setPresent(true);
  }, [open]);

  if (!present) {
    return null;
  }

  return (
    <div
      className={cn('ul-w-[308px] ul-p-3 sm:ul-w-96', {
        'ul-absolute': !open,
      })}
    >
      <AnimatePresence
        mode="popLayout"
        onExitComplete={() => setPresent(false)}
      >
        {open && (
          <m.div
            animate="open"
            exit="closed"
            initial="closed"
            style={{ originY: 'bottom' }}
            transition={TRANS_SPRING}
            variants={{
              closed: {
                filter: 'blur(4px)',
                opacity: 0,
              },
              open: {
                filter: 'blur(0px)',
                opacity: 1,
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
