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
        className={cn(
          'ul-flex ul-w-full ul-items-center ul-justify-between ul-gap-2 ul-pt-4',
        )}
      >
        <button
          aria-label="Switch active credit card"
          className={cn(
            'ul-grid ul-size-8 ul-place-content-center ul-rounded-lg ul-border ul-transition-colors',
            'ul-border-zinc-200 hover:ul-bg-zinc-200/60 hover:ul-text-zinc-800',
            'dark:ul-border-zinc-700/40 dark:hover:ul-bg-zinc-800 dark:hover:ul-text-white',
          )}
          disabled={loading}
          onClick={() => setSwitchCard(true)}
          type="button"
        >
          <ArrowRightLeft className={cn('ul-size-4')} />
        </button>
        <div
          className={cn(
            'ul-relative ul-flex ul-overflow-hidden ul-rounded-lg before:ul-pointer-events-none before:ul-absolute before:ul-inset-0 before:ul-z-10 before:ul-rounded-lg before:ul-shadow-pop-sm',
          )}
        >
          <input
            className={cn(
              'ul-w-[3.375rem] ul-rounded-lg ul-rounded-e-none ul-border-r ul-pl-3 ul-pt-[2px] ul-font-cc ul-uppercase ul-outline-0 ul-transition-colors',
              'ul-border-r-transparent ul-bg-sky-100 ul-text-sky-700 ul-placeholder-sky-700/60 hover:ul-bg-sky-200 focus-visible:ul-bg-sky-100',
              'dark:ul-border-r-black/40 dark:ul-bg-sky-950/70 dark:ul-text-sky-400 dark:ul-placeholder-sky-300/40 dark:hover:ul-bg-sky-950/80 dark:focus-visible:ul-bg-sky-950/70',
              {
                'dark:ul-bg-teal-950 dark:ul-text-teal-100 dark:placeholder:ul-text-green-100/40':
                  success,
                'ul-bg-green-100 ul-text-green-700 placeholder:ul-text-green-700/50':
                  success,
                'ul-pointer-events-none': loading,
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
              'ul-relative ul-rounded-s-none ul-shadow-transparent after:ul-absolute after:ul-inset-y-px after:ul-left-0 after:ul-border-l',
              'after:ul-border-l-black/10',
              'dark:after:ul-border-l-white/5',
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
      <div className={cn('ul-grid ul-grid-cols-2 ul-gap-3')}>
        <PaymentMethod checked variant="applePay" />
        <PaymentMethod variant="googlePay" />
        <PaymentMethod variant="paypal" />
        <PaymentMethod variant="cashApp" />
        <PaymentMethod variant="klarna" />
        <PaymentMethod variant="amazonPay" />
      </div>
      <footer
        className={cn('ul-flex ul-w-full ul-justify-end ul-gap-2 ul-pt-4')}
      >
        <PayButton />
      </footer>
    </>
  );
};
