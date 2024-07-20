import { AnimateDimension } from '@/components/AnimateDimension';
import { Button } from './Button';
import { Close, CreditCard } from '@/components/Icon';
import { cn } from '@/lib/utils';
import { Content } from './Content';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import {
  type DynamicBuyButtonContextProps,
  type TabContentProps,
  TABS,
} from './';
import { TabContent } from './TabContent';
import { Root as Tabs } from '@radix-ui/react-tabs';
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
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const [selectedTab, setSelectedTab] = useState(TABS[0].label);
  const [success, setSuccess] = useState(false);
  const [switchCard, setSwitchCard] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpen = () => {
    setOpen(!open);
    setOverflow(false);
    setIcon(open ? <CreditCard /> : <Close />);
    !open && setSuccess(false);
    !open && setSelectedTab(TABS[0].label);
    !open && setCcv('');
  };

  const handleTabChange = (value: TabContentProps['value']) => {
    setOverflow(false);
    setSelectedTab(value);
  };

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const esc = (e: KeyboardEvent) =>
      e.key === 'Escape' && !loading && handleOpen();
    html.addEventListener('keydown', esc);
    return () => html.removeEventListener('keydown', esc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, loading]);

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
      inert={loading ? '' : undefined}
      onAnimationComplete={variant => {
        variant === 'open' && inputRef.current?.focus({ preventScroll: true });
        variant === 'closed' &&
          buttonRef.current?.focus({ preventScroll: true });
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
            inputRef,
            loading,
            open,
            overflow,
            selectedTab,
            setCcv,
            setLoading,
            setOverflow,
            setSuccess,
            setSwitchCard,
            success,
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
            <TabContent value={TABS[0].label} />
            <TabContent value={TABS[1].label} />
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
