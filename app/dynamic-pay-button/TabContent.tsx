import { ArrowRightLeft } from '@/components/Icon';
import { Cards } from './Cards';
import { cn } from '@/lib/utils';
import { Content } from '@radix-ui/react-tabs';
import { m } from 'framer-motion';
import { type TabContentProps, TABS, useDynamicPayButton } from './';
import { TRANS_SPRING_FAST } from '@/lib/config';

export const TabContent = ({ value }: TabContentProps) => {
  return (
    <Content value={value}>
      <m.div
        animate="open"
        initial="closed"
        transition={{
          ...TRANS_SPRING_FAST,
          filter: { delay: 0.2 },
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
      </m.div>
    </Content>
  );
};

const TabContentCard = () => {
  const { ccv, inputRef, setCcv, setSwitchCard } = useDynamicPayButton();

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
            'border-zinc-200 hover:bg-zinc-100 hover:text-zinc-800',
            'dark:border-zinc-700/70 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',
          )}
          onClick={() => setSwitchCard(true)}
        >
          <ArrowRightLeft className="size-4" />
        </button>
        <div
          className={cn(
            'relative flex overflow-hidden rounded-lg before:pointer-events-none before:absolute before:inset-0 before:z-10 before:rounded-lg before:shadow-pop-sm',
          )}
        >
          <input
            className={cn(
              'w-[3.375rem] rounded-lg rounded-e-none border-r pl-3 pt-[2px] font-cc uppercase outline-0 transition-colors',
              'border-r-transparent bg-sky-100 text-sky-800 placeholder-sky-800/50 hover:bg-sky-200 focus-visible:bg-sky-100',
              'dark:border-r-black/40 dark:bg-sky-950/70 dark:text-sky-300 dark:placeholder-sky-300/40 dark:hover:bg-sky-950/80 dark:focus-visible:bg-sky-950/70',
            )}
            maxLength={3}
            onChange={e => setCcv(e.target.value)}
            pattern="\d*"
            placeholder="ccv"
            ref={inputRef}
            value={ccv}
          />
          <button
            className={cn(
              'relative cursor-default whitespace-nowrap rounded-lg rounded-s-none px-3 py-2 outline-0 transition-colors',
              'z-0 after:absolute after:bottom-px after:left-0 after:top-px after:border-l',
              'bg-sky-100 text-sky-800 after:border-l-black/10 hover:bg-sky-200 focus-visible:bg-sky-200',
              'dark:bg-sky-950 dark:text-sky-300 dark:after:border-l-white/5 dark:hover:bg-sky-900/60 dark:hover:text-sky-200',
              'dark:focus-visible:bg-sky-900/60 dark:focus-visible:text-sky-200',
            )}
          >
            Pay Now
          </button>
        </div>
      </footer>
    </>
  );
};

const TabContentOtherMethods = () => {
  return <>Other methods</>;
};
