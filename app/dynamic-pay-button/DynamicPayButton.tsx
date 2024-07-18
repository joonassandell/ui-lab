import { AnimateDimension } from '@/components/AnimateDimension';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowRightLeft, Close, CreditCard } from '@/components/Icon';
import { Cards } from './Cards';
import { cn } from '@/lib/utils';
import { TRANS_SPRING, TRANS_SPRING_SLOW } from '@/lib/config';
import { useEffect, useRef, useState } from 'react';

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
  const [open, setOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [switchCard, setSwitchCard] = useState(false);
  const [ccv, setCcv] = useState<string>('');
  const [content, setContent] = useState(false);
  const [icon, setIcon] = useState(<CreditCard />);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOpen = () => {
    setOpen(!open);
    setAnimating(true);
    setContent(true);
    setIcon(open ? <CreditCard /> : <Close />);
    !open && setCcv('');
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
        'ul-component relative flex flex-col items-center text-sm font-medium shadow-pop',
        'bg-white text-zinc-500',
        'dark:bg-zinc-900 dark:text-zinc-300',
        {
          'has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-2':
            !open,
          'has-[:focus-visible]:outline-black/30 dark:has-[:focus-visible]:outline-white/20':
            !open,
          'overflow-hidden': animating,
        },
      )}
      onAnimationComplete={() => {
        !open && !animating && setContent(false);
        open && !animating && inputRef.current?.focus();
      }}
      onAnimationStart={() =>
        open ? buttonRef.current?.blur() : buttonRef.current?.focus()
      }
      onUpdate={e => {
        if (e.borderRadius === 20 || e.borderRadius === 60) {
          animating && setAnimating(false);
        }
      }}
      refClassname={cn('flex flex-col items-center')}
      variants={{
        closed: { borderRadius: 60 },
        open: { borderRadius: 20 },
      }}
    >
      <header className={cn('flex w-full items-center justify-between p-3')}>
        <AnimatePresence mode="popLayout">
          {open && (
            <m.nav
              animate={{ opacity: 1, x: '0%' }}
              className={cn('flex gap-1')}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0, x: '50%' }}
              transition={TRANS_SPRING}
            >
              <button
                className={cn(
                  'cursor-default whitespace-nowrap rounded-lg px-2 py-1',
                  'bg-zinc-100 text-zinc-800',
                  'dark:bg-zinc-800 dark:text-zinc-100',
                )}
              >
                Credit card
              </button>
              <button
                className={cn(
                  'cursor-default whitespace-nowrap rounded-lg px-2 py-1 transition-colors',
                  'hover:text-zinc-800',
                  'dark:text-zinc-400 dark:hover:text-zinc-100',
                )}
              >
                Other methods
              </button>
            </m.nav>
          )}
        </AnimatePresence>
        <m.button
          className={cn(
            'flex cursor-default select-none items-center justify-center gap-3 self-start overflow-hidden whitespace-nowrap rounded-lg px-3 py-1 transition-colors',
            'hover:text-zinc-800',
            'dark:hover:text-zinc-100',
            {
              'outline-0': !open || (animating && open),
              'px-1': open,
            },
          )}
          layout
          onClick={handleOpen}
          ref={buttonRef}
          transition={TRANS_SPRING}
        >
          {!open && 'Pay Now'}
          <AnimatePresence initial={false} mode="popLayout">
            <m.span
              animate={{ scale: 1 }}
              className={cn('flex size-5 items-center justify-center')}
              exit={{ scale: 0 }}
              initial={{ scale: 0 }}
              key={icon.type.name}
              transition={TRANS_SPRING_SLOW}
            >
              {icon}
            </m.span>
          </AnimatePresence>
        </m.button>
      </header>
      {content && (
        <m.div
          animate={open ? 'open' : 'closed'}
          className={cn('w-[368px] p-3 md:w-96', {
            absolute: !open,
            'top-14': !open,
          })}
          initial="closed"
          style={{ originY: 'bottom' }}
          transition={{
            ...TRANS_SPRING,
            filter: { delay: 0.2 },
          }}
          variants={{
            closed: {
              filter: 'blur(4px)',
              opacity: 0,
              rotate: 20,
              scale: 0.2,
            },
            open: {
              filter: 'blur(0px)',
              opacity: 1,
              rotate: 0,
              scale: 1,
            },
          }}
        >
          <Cards
            ccv={ccv}
            setCcv={setCcv}
            setSwitchCard={setSwitchCard}
            switchCard={switchCard}
          />
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
        </m.div>
      )}
    </AnimateDimension>
  );
};
