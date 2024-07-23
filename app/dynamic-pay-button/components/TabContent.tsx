import { ArrowRightLeft } from '@/components/Icon';
import { Cards } from './Cards';
import { cn } from '@/lib/utils';
import { Content } from '@radix-ui/react-tabs';
import { m } from 'framer-motion';
import { PayButton } from './PayButton';
import { PaymentMethod } from './PaymentMethod';
import { type TabContentProps, TABS, useDynamicPayButton } from '../';
import { TRANS_SPRING_FAST } from '@/lib/config';

export const TabContent = ({ value }: TabContentProps) => {
  return (
    <Content asChild tabIndex={-1} value={value}>
      <m.form
        animate="open"
        initial="closed"
        transition={{
          ...TRANS_SPRING_FAST,
          filter: { delay: 0.05 },
        }}
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
        {value === TABS[0].label && <TabContentCard />}
        {value === TABS[1].label && <TabContentOtherMethods />}
      </m.form>
    </Content>
  );
};

const TabContentCard = () => {
  const { ccv, inputRef, loading, setCcv, setSwitchCard, success } =
    useDynamicPayButton();

  return (
    <>
      <Cards />
      <footer
        className={cn('flex w-full items-center justify-between gap-2 pt-4')}
      >
        <button
          aria-label="Switch active credit card"
          className={cn(
            'grid size-8 cursor-default place-content-center rounded-lg border border-transparent transition-colors',
            'border-zinc-200 hover:bg-zinc-200/60 hover:text-zinc-800',
            'dark:border-zinc-700/40 dark:hover:bg-zinc-800 dark:hover:text-white',
          )}
          disabled={loading}
          onClick={() => setSwitchCard(true)}
          type="button"
        >
          <ArrowRightLeft className={cn('size-4')} />
        </button>
        <div
          className={cn(
            'relative flex overflow-hidden rounded-lg before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-lg before:shadow-pop-sm',
          )}
        >
          <input
            className={cn(
              'w-[3.375rem] rounded-lg rounded-e-none border-r pl-3 pt-[2px] font-cc uppercase outline-0 transition-colors',
              'border-r-transparent bg-sky-100 text-sky-700 placeholder-sky-700/60 hover:bg-sky-200 focus-visible:bg-sky-100',
              'dark:border-r-black/40 dark:bg-sky-950/70 dark:text-sky-400 dark:placeholder-sky-300/40 dark:hover:bg-sky-950/80 dark:focus-visible:bg-sky-950/70',
              {
                'bg-green-100 text-green-700 placeholder:text-green-700/50':
                  success,
                'dark:bg-teal-950 dark:text-teal-100 dark:placeholder:text-green-100/40':
                  success,
              },
            )}
            disabled={loading}
            maxLength={3}
            onChange={e => setCcv(e.target.value)}
            pattern="\d*"
            placeholder="ccv"
            ref={inputRef}
            value={ccv}
          />
          <PayButton
            className={cn(
              'relative rounded-s-none shadow-transparent after:absolute after:bottom-px after:left-0 after:top-px after:border-l',
              'after:border-l-black/10',
              'dark:after:border-l-white/5',
            )}
          />
        </div>
      </footer>
    </>
  );
};

const TabContentOtherMethods = () => {
  return (
    <>
      <div className={cn('grid grid-cols-2 gap-3')}>
        <PaymentMethod checked variant="applePay" />
        <PaymentMethod variant="googlePay" />
        <PaymentMethod variant="paypal" />
        <PaymentMethod variant="cashApp" />
        <PaymentMethod variant="klarna" />
        <PaymentMethod variant="amazonPay" />
      </div>
      <footer className={cn('flex w-full justify-end gap-2 pt-4')}>
        <PayButton />
      </footer>
    </>
  );
};
