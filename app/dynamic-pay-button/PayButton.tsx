import { AnimateDimension } from '@/components/AnimateDimension';
import { AnimatePresence, m } from 'framer-motion';
import { cn, sleep } from '@/lib/utils';
import { type PayButtonProps, useDynamicPayButton } from './';
import { Spinner } from '@/components/Spinner/Spinner';
import { TRANS_SPRING_FAST } from '@/lib/config';
import { useState } from 'react';

export const PayButton = ({ className }: PayButtonProps) => {
  const { handleOpen, loading, setLoading } = useDynamicPayButton();
  const [success, setSuccess] = useState(false);

  const handleLoading = async () => {
    setLoading(true);
    await sleep(1500);
    setLoading(false);
    setSuccess(true);
    await sleep(1200);
    handleOpen();
  };

  return (
    <m.button
      className={cn(
        'relative flex cursor-default items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-lg shadow-pop-sm outline-0 transition-colors',
        'bg-sky-100 text-sky-800 hover:bg-sky-200 focus-visible:bg-sky-200',
        'dark:bg-sky-950 dark:text-sky-300 dark:hover:bg-sky-900/60 dark:hover:text-sky-200',
        'dark:focus-visible:bg-sky-900/60 dark:focus-visible:text-sky-200',
        className,
      )}
      onClick={handleLoading}
    >
      <AnimateDimension
        animate="open"
        refClassname="w-fit"
        transition={TRANS_SPRING_FAST}
        variants={{
          closed: { borderRadius: 60 },
          open: { borderRadius: 20 },
        }}
      >
        <div className={cn('flex items-center justify-center gap-2 px-3 py-2')}>
          {success && 'Payment successful'}
          {!success && (
            <m.div
              animate={{ scale: loading ? [0.9, 0] : 1 }}
              aria-hidden={loading}
              initial={false}
              tabIndex={-1}
              transition={TRANS_SPRING_FAST}
              whileTap={{ scale: 0.9 }}
            >
              Pay Now
            </m.div>
          )}
          <AnimatePresence initial={false} mode="popLayout">
            {loading && (
              <m.div
                animate={{ scale: 1 }}
                className={cn('absolute')}
                exit={{ scale: 0 }}
                initial={{ scale: 0 }}
                transition={TRANS_SPRING_FAST}
              >
                <Spinner
                  className={cn(
                    'size-5 fill-sky-800 text-blue-300 dark:fill-sky-300 dark:text-black/25',
                  )}
                />
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </AnimateDimension>
    </m.button>
  );
};
