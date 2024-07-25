'use client';

import { AnimateDimension } from '@/components/AnimateDimension';
import { Button } from './components/Button';
import { Close, CreditCard } from '@/components/Icon';
import { cn } from '@/lib/utils';
import { Content } from './components/Content';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { domMax, LazyMotion } from 'framer-motion';
import {
  type DynamicBuyButtonContextProps,
  type DynamicBuyButtonProps,
  type TabContentProps,
  TABS,
} from './';
import { TabContent } from './components/TabContent';
import { Root as Tabs } from '@radix-ui/react-tabs';
import { TabsList } from './components/TabsList';

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
export const DynamicPayButton = ({
  onCardTouchEnd,
  onCardTouchStart,
}: DynamicBuyButtonProps) => {
  const [ccv, setCcv] = useState<string>('');
  const [icon, setIcon] = useState(<CreditCard className={cn('ul-size-5')} />);
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
    setIcon(
      open ? (
        <CreditCard className={cn('ul-size-5')} />
      ) : (
        <Close className={cn('ul-size-5')} />
      ),
    );
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
    <LazyMotion features={domMax} strict>
      <AnimateDimension
        animate={open ? 'open' : 'closed'}
        className={cn(
          'ul-scope ul-relative ul-overflow-hidden ul-text-sm ul-font-medium ul-shadow-pop',
          'ul-bg-white ul-text-zinc-500',
          'dark:ul-bg-zinc-900 dark:ul-text-zinc-400',
          {
            'has-[:focus-visible]:ul-outline has-[:focus-visible]:ul-outline-1 has-[:focus-visible]:ul-outline-offset-2':
              !open,
            'has-[:focus-visible]:ul-outline-black/30 dark:has-[:focus-visible]:ul-outline-white/20':
              !open,
            'ul-overflow-visible': overflow,
          },
        )}
        onAnimationComplete={variant => {
          variant === 'open' &&
            inputRef.current?.focus({ preventScroll: true });
          variant === 'closed' &&
            buttonRef.current?.focus({ preventScroll: true });
        }}
        onAnimationStart={variant =>
          variant === 'open' && buttonRef.current?.blur()
        }
        variants={{
          closed: { borderRadius: 60 },
          open: { borderRadius: 20 },
        }}
      >
        <Tabs
          className={cn('ul-flex ul-flex-col ul-items-center')}
          onValueChange={handleTabChange}
          value={selectedTab}
        >
          <DynamicPayButtonContext.Provider
            value={{
              ccv,
              handleOpen,
              inputRef,
              loading,
              onCardTouchEnd,
              onCardTouchStart,
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
              className={cn(
                'ul-flex ul-w-full ul-items-center ul-justify-between ul-p-3',
              )}
              inert={loading ? '' : undefined}
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
    </LazyMotion>
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
