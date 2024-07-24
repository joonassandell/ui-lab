import { AnimateDimension } from '@/components/AnimateDimension';
import { Check } from '@/components/Icon';
import { cn, sleep } from '@/lib/utils';
import { m } from 'framer-motion';
import { type MouseEvent } from 'react';
import { type PayButtonProps, useDynamicPayButton } from '../';
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
        'ul-overflow-hidden ul-whitespace-nowrap ul-rounded-lg ul-shadow-pop-sm ul-outline-0 ul-transition-colors',
        'ul-bg-sky-100 ul-text-sky-700 hover:ul-bg-sky-200 focus-visible:ul-bg-sky-200',
        'dark:ul-bg-sky-950 dark:ul-text-sky-300 dark:hover:ul-bg-sky-900/60 dark:hover:ul-text-sky-200',
        'dark:ul-focus-visible:ul-bg-sky-900/60 dark:ul-focus-visible:ul-text-sky-200',
        {
          'dark:ul-focus-visible:ul-bg-teal-900 dark:ul-focus-visible:ul-text-teal-100 dark:ul-bg-teal-900 dark:ul-text-teal-100':
            success,
          'ul-focus-visible:ul-bg-green-100 ul-focus-visible:ul-text-green-700 ul-pointer-events-none ul-bg-green-100 ul-text-green-700':
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
            'ul-active:ul-scale-[0.95] ul-flex ul-items-center ul-justify-center ul-gap-1 ul-px-3 ul-py-2',
            {
              'ul-active:ul-scale-100': loading,
            },
          )}
        >
          {((!loading && !success) || (loading && !success)) && (
            <div aria-hidden={loading}>Pay Now</div>
          )}
          {loading && !success && (
            <m.div
              animate={{ scale: 1 }}
              className={cn('ul-ml-1')}
              exit={{ scale: 0 }}
              initial={{ scale: 0 }}
              transition={TRANS_SPRING}
            >
              <Spinner
                className={cn(
                  'ul-size-4 ul-fill-sky-800 ul-text-blue-300 dark:ul-fill-sky-300 dark:ul-text-black/30',
                )}
                screenReaderText="Processing payment…"
              />
            </m.div>
          )}
          {success && (
            <>
              Payment successful
              <Check className={cn('ul-size-5')} />
            </>
          )}
        </div>
      </AnimateDimension>
    </m.button>
  );
};
