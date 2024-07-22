import { AnimateDimension } from '@/components/AnimateDimension';
import { Check } from '@/components/Icon';
import { cn, sleep } from '@/lib/utils';
import { m } from 'framer-motion';
import { type MouseEvent } from 'react';
import { type PayButtonProps, useDynamicPayButton } from './';
import { Spinner } from '@/components/Spinner/Spinner';
import { TRANS_SPRING } from '@/lib/config';

export const PayButton = ({ className }: PayButtonProps) => {
  const { handleOpen, loading, setLoading, setSuccess, success } =
    useDynamicPayButton();

  const handleLoading = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    await sleep(1500);
    setSuccess(true);
    await sleep(1200);
    setLoading(false);
    handleOpen();
  };

  return (
    <m.button
      className={cn(
        'cursor-default overflow-hidden whitespace-nowrap rounded-lg shadow-pop-sm outline-0 transition-colors',
        'bg-sky-100 text-sky-700 hover:bg-sky-200 focus-visible:bg-sky-200',
        'dark:bg-sky-950 dark:text-sky-300 dark:hover:bg-sky-900/60 dark:hover:text-sky-200',
        'dark:focus-visible:bg-sky-900/60 dark:focus-visible:text-sky-200',
        {
          'dark:bg-teal-900 dark:text-teal-100 dark:focus-visible:bg-teal-900 dark:focus-visible:text-teal-100':
            success,
          'pointer-events-none bg-green-100 text-green-700 focus-visible:bg-green-100 focus-visible:text-green-700':
            success,
        },
        className,
      )}
      onClick={handleLoading}
      type="submit"
    >
      <AnimateDimension>
        <div
          className={cn(
            'flex items-center justify-center gap-1 px-3 py-2 active:scale-[0.95]',
            {
              'active:scale-100': loading,
            },
          )}
        >
          {((!loading && !success) || (loading && !success)) && (
            <div aria-hidden={loading}>Pay Now</div>
          )}
          {loading && !success && (
            <m.div
              animate={{ scale: 1 }}
              className={cn('ml-1')}
              exit={{ scale: 0 }}
              initial={{ scale: 0 }}
              transition={TRANS_SPRING}
            >
              <Spinner
                className={cn(
                  'size-4 fill-sky-800 text-blue-300 dark:fill-sky-300 dark:text-black/30',
                )}
                screenReaderText="Processing payment…"
              />
            </m.div>
          )}
          {success && (
            <>
              Payment successful
              <Check className={cn('size-5')} />
            </>
          )}
        </div>
      </AnimateDimension>
    </m.button>
  );
};
