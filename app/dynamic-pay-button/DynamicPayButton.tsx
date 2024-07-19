import { AnimateDimension } from '@/components/AnimateDimension';
import { ArrowRightLeft, Close, CreditCard } from '@/components/Icon';
import { Button } from './Button';
import { Cards } from './Cards';
import { cn } from '@/lib/utils';
import { Content } from './Content';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { type DynamicBuyButtonContextProps, TABS } from './';
import { Content as TabContent, Root as Tabs } from '@radix-ui/react-tabs';
import { TabsList } from './TabsList';

/**
 * Dynamic Pay Button
 *
 * Inspired by:
 * @link https://www.uilabs.dev
 * @link https://codepen.io/tmorrell82/pen/qBqyyBM
 * @link https://codepen.io/FilipVitas/pen/ddLVZx
 *
 * @author Joonas Sandell <me@joonassandell.com>
 */
export const DynamicPayButton = () => {
  const [ccv, setCcv] = useState<string>('');
  const [icon, setIcon] = useState(<CreditCard />);
  const [open, setOpen] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const [selectedTab, setSelectedTab] = useState(TABS[0].label);
  const [switchCard, setSwitchCard] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpen = () => {
    setOpen(!open);
    setOverflow(false);
    setIcon(open ? <CreditCard /> : <Close />);
    !open && setSelectedTab(TABS[0].label);
    !open && setCcv('');
  };

  const handleTabChange = (value: string) => {
    setOverflow(false);
    setSelectedTab(value);
  };

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && handleOpen();
    html.addEventListener('keydown', esc);
    return () => html.removeEventListener('keydown', esc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <AnimateDimension
      animate={open ? 'open' : 'closed'}
      className={cn(
        'ul-component relative flex flex-col items-center overflow-hidden text-sm font-medium shadow-pop',
        'bg-white text-zinc-500',
        'dark:bg-zinc-900 dark:text-zinc-300',
        {
          'has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-2':
            !open,
          'has-[:focus-visible]:outline-black/30 dark:has-[:focus-visible]:outline-white/20':
            !open,
          'overflow-visible': overflow,
        },
      )}
      onAnimationComplete={variant => {
        variant === 'open' &&
          inputRef.current?.focus({
            preventScroll: true,
          });
        variant === 'closed' &&
          buttonRef.current?.focus({
            preventScroll: true,
          });
      }}
      onAnimationStart={variant => {
        variant === 'open' && buttonRef.current?.blur();
      }}
      variants={{
        closed: { borderRadius: 60 },
        open: { borderRadius: 20 },
      }}
    >
      <Tabs
        className={cn('flex flex-col items-center')}
        onValueChange={handleTabChange}
        value={selectedTab}
      >
        <DynamicPayButtonContext.Provider
          value={{
            ccv,
            handleOpen,
            open,
            overflow,
            selectedTab,
            setCcv,
            setOverflow,
            setSwitchCard,
            switchCard,
          }}
        >
          <header
            className={cn('flex w-full items-center justify-between p-3')}
          >
            <TabsList />
            <Button icon={icon} ref={buttonRef} />
          </header>
          <Content>
            <TabContent value={TABS[0].label}>
              <Cards />
              <footer
                className={cn(
                  'flex w-full items-center justify-between gap-2 pt-4',
                )}
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
            </TabContent>
            <TabContent value={TABS[1].label}>Other methods</TabContent>
          </Content>
        </DynamicPayButtonContext.Provider>
      </Tabs>
    </AnimateDimension>
  );
};

const DynamicPayButtonContext = createContext<
  DynamicBuyButtonContextProps | undefined
>(undefined);

export const useDynamicPayButton = () => {
  const context = useContext(DynamicPayButtonContext);
  if (context) return context;
  throw new Error('useDynamicPayButton must be used within DynamicPayButton');
};
