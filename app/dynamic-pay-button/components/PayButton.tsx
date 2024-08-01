import { AnimateDimension } from '@/components/AnimateDimension';
import { Check } from '@/components/Icon';
import { cn, sleep } from '@/lib/utils';
import { m } from 'framer-motion';
import { type MouseEvent } from 'react';
import { type PayButtonProps, useDynamicPayButton } from '../';
import { Spinner } from '@/components/Spinner';
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
        'u-overflow-hidden u-whitespace-nowrap u-rounded-lg u-shadow-pop-sm u-outline-0 u-transition-colors',
        'u-bg-sky-100 u-text-sky-700 hover:u-bg-sky-200 focus-visible:u-bg-sky-200',
        'dark:u-bg-sky-950 dark:u-text-sky-300 dark:hover:u-bg-sky-900/60 dark:hover:u-text-sky-200',
        'dark:focus-visible:u-bg-sky-900/60 dark:focus-visible:u-text-sky-200',
        'u-group',
        {
          'dark:focus-visible:u-bg-teal-900 dark:focus-visible:u-text-teal-100 dark:u-bg-teal-900 dark:u-text-teal-100 dark:hover:u-bg-teal-900 dark:hover:u-text-teal-100':
            success || (success && !loading),
          'focus-visible:u-bg-green-100 focus-visible:u-text-green-700 hover:u-bg-green-100 hover:u-text-green-700 u-bg-green-100 u-text-green-700':
            success || (success && !loading),
        },
        className,
      )}
      onClick={handleLoading}
      type="submit"
    >
      <AnimateDimension>
        <div
          className={cn(
            'u-flex u-items-center u-justify-center u-gap-1 u-px-3 u-py-2',
            {
              'group-active:u-scale-[0.95]': !loading,
            },
          )}
        >
          {((!loading && !success) || (loading && !success)) && (
            <div aria-hidden={loading}>Pay Now</div>
          )}
          {loading && !success && (
            <m.div
              animate={{ scale: 1 }}
              className={cn('u-ml-1')}
              exit={{ scale: 0 }}
              initial={{ scale: 0 }}
              transition={TRANS_SPRING}
            >
              <Spinner
                className={cn(
                  'u-size-4 u-fill-sky-800 u-text-blue-300 dark:u-fill-sky-300 dark:u-text-black/30',
                )}
                screenReaderText="Processing payment…"
              />
            </m.div>
          )}
          {success && (
            <>
              Payment successful
              <Check className={cn('u-size-5')} />
            </>
          )}
        </div>
      </AnimateDimension>
    </m.button>
  );
};
