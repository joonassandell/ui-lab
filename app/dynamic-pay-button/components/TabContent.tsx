import { ArrowRightLeft } from '@/components/Icon';
import { Cards } from './Cards';
import { cn } from '@/lib/utils';
import { Content } from '@radix-ui/react-tabs';
import { m } from 'framer-motion';
import { PayButton } from './PayButton';
import { PaymentMethod } from './PaymentMethod';
import { type TabContentProps, TABS, useDynamicPayButton } from '../';
import { TRANS_SPRING } from '@/lib/config';

export const TabContent = ({ value }: TabContentProps) => {
  const { tabInitialAnim } = useDynamicPayButton();

  return (
    <Content asChild tabIndex={-1} value={value}>
      <m.form
        animate="open"
        initial={tabInitialAnim ? 'closed' : false}
        transition={{
          ...TRANS_SPRING,
          filter: { delay: 0.1 },
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
          'u:relative u:z-0 u:flex u:w-full u:items-center u:justify-between u:gap-2 u:pt-4',
        )}
      >
        <button
          aria-label="Switch active credit card"
          className={cn(
            'u:grid u:size-8 u:place-content-center u:rounded-lg u:border u:transition-colors',
            'u:active:scale-[0.9]',
            'u:border-zinc-200 u:hover:bg-zinc-200/60 u:hover:text-zinc-800',
            'u:dark:border-zinc-700/40 u:dark:hover:bg-zinc-800 u:dark:hover:text-white',
          )}
          disabled={loading}
          onClick={() => setSwitchCard(true)}
          type="button"
        >
          <ArrowRightLeft className={cn('u:size-4')} />
        </button>
        <div
          className={cn(
            'u:relative u:flex u:overflow-hidden u:rounded-lg u:before:pointer-events-none u:before:absolute u:before:inset-0 u:before:z-10 u:before:rounded-lg u:before:shadow-pop-sm',
          )}
        >
          <input
            className={cn(
              'u:w-13.5 u:rounded-lg u:rounded-e-none u:border-r u:pt-[2px] u:pl-3 u:font-cc u:uppercase u:outline-hidden u:transition-colors',
              'u:border-r-transparent u:bg-sky-100 u:text-sky-700 u:placeholder-sky-700/60 u:hover:bg-sky-200 u:focus-visible:bg-sky-100',
              'u:dark:border-r-black/40 u:dark:bg-sky-950/70 u:dark:text-sky-400 u:dark:placeholder-sky-300/40 u:dark:hover:bg-sky-950/80 u:dark:focus-visible:bg-sky-950/70',
              {
                'u:bg-green-100 u:text-green-700 u:placeholder:text-green-700/50':
                  success,
                'u:dark:bg-teal-950 u:dark:text-teal-100 u:dark:placeholder:text-green-100/40':
                  success,
                'u:pointer-events-none': loading,
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
              'u:relative u:rounded-s-none u:shadow-transparent u:after:absolute u:after:inset-y-px u:after:left-0 u:after:border-l',
              'u:after:border-l-black/10',
              'u:dark:after:border-l-white/5',
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
      <div className={cn('u:grid u:grid-cols-2 u:gap-3')}>
        <PaymentMethod checked variant="applePay" />
        <PaymentMethod variant="googlePay" />
        <PaymentMethod variant="paypal" />
        <PaymentMethod variant="cashApp" />
        <PaymentMethod variant="klarna" />
        <PaymentMethod variant="amazonPay" />
      </div>
      <footer className={cn('u:flex u:w-full u:justify-end u:gap-2 u:pt-4')}>
        <PayButton />
      </footer>
    </>
  );
};
