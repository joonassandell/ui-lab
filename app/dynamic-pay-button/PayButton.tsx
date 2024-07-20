import { AnimateDimension } from '@/components/AnimateDimension';
import { Check } from '@/components/Icon';
import { cn, sleep } from '@/lib/utils';
import { m } from 'framer-motion';
import { type PayButtonProps, useDynamicPayButton } from './';
import { Spinner } from '@/components/Spinner/Spinner';
import { TRANS_SPRING, TRANS_SPRING_FAST } from '@/lib/config';

export const PayButton = ({ className }: PayButtonProps) => {
  const { handleOpen, loading, setLoading, setSuccess, success } =
    useDynamicPayButton();

  const handleLoading = async () => {
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
        'bg-sky-100 text-sky-800 hover:bg-sky-200 focus-visible:bg-sky-200',
        'dark:bg-sky-950 dark:text-sky-300 dark:hover:bg-sky-900/60 dark:hover:text-sky-200',
        'dark:focus-visible:bg-sky-900/60 dark:focus-visible:text-sky-200',
        {
          'bg-green-100 text-green-700': success,
          'dark:bg-teal-900 dark:text-teal-100': success,
        },
        className,
      )}
      onClick={handleLoading}
    >
      <AnimateDimension
        animate="open"
        refClassname="w-fit"
        variants={{
          closed: { borderRadius: 60 },
          open: { borderRadius: 20 },
        }}
      >
        <m.div
          className={cn('flex items-center justify-center gap-1 px-3 py-2')}
          tabIndex={-1}
          transition={TRANS_SPRING_FAST}
          whileTap={{ scale: loading || success ? 1 : 0.88 }}
        >
          {((!loading && !success) || (loading && !success)) && 'Pay Now'}
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
              />
            </m.div>
          )}
          {success && (
            <>
              Payment successful
              <Check className={cn('size-5')} />
            </>
          )}
        </m.div>
      </AnimateDimension>
    </m.button>
  );
};
