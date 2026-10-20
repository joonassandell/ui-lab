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
        'u:overflow-hidden u:rounded-lg u:whitespace-nowrap u:shadow-pop-sm u:outline-0 u:transition-colors',
        'u:bg-sky-100 u:text-sky-700 u:hover:bg-sky-200 u:focus-visible:bg-sky-200',
        'u:dark:bg-sky-950 u:dark:text-sky-300 u:dark:hover:bg-sky-900/60 u:dark:hover:text-sky-200',
        'u:dark:focus-visible:bg-sky-900/60 u:dark:focus-visible:text-sky-200',
        'u:group',
        {
          'u:bg-green-100 u:text-green-700 u:hover:bg-green-100 u:hover:text-green-700 u:focus-visible:bg-green-100 u:focus-visible:text-green-700':
            success || (success && !loading),
          'u:dark:bg-teal-900 u:dark:text-teal-100 u:dark:hover:bg-teal-900 u:dark:hover:text-teal-100 u:dark:focus-visible:bg-teal-900 u:dark:focus-visible:text-teal-100':
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
            'u:flex u:items-center u:justify-center u:gap-1 u:px-3 u:py-2',
            {
              'u:group-active:scale-[0.95]': !loading,
            },
          )}
        >
          {((!loading && !success) || (loading && !success)) && (
            <div aria-hidden={loading}>Pay Now</div>
          )}
          {loading && !success && (
            <m.div
              animate={{ scale: 1 }}
              className={cn('u:ml-1')}
              exit={{ scale: 0 }}
              initial={{ scale: 0 }}
              transition={TRANS_SPRING}
            >
              <Spinner
                className={cn(
                  'u:size-4 u:fill-sky-800 u:text-blue-300 u:dark:fill-sky-300 u:dark:text-black/30',
                )}
                screenReaderText="Processing payment…"
              />
            </m.div>
          )}
          {success && (
            <>
              Payment successful
              <Check className={cn('u:size-5')} />
            </>
          )}
        </div>
      </AnimateDimension>
    </m.button>
  );
};
