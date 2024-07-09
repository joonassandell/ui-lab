'use client';

import { AnimateDimension } from '@/components/AnimateDimension';
import { AnimatePresence, m } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TRANS_SPRING, TRANS_SPRING_SLOW } from '@/lib/config';
import { useCallback, useState } from 'react';

export const DynamicPayButton = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(false);
  const [icon, setIcon] = useState(<CreditCard />);

  const handleOpen = useCallback(() => {
    setOpen(!open);
    setContent(true);
    setIcon(open ? <CreditCard /> : <Close />);
  }, [open]);

  return (
    <AnimateDimension
      animate={open ? 'open' : 'closed'}
      className={cn(
        'relative flex flex-col items-center overflow-hidden bg-zinc-50 text-sm font-medium text-slate-500 shadow-pop dark:bg-zinc-900 dark:text-slate-50',
      )}
      initial="closed"
      onAnimationComplete={() => !open && content && setContent(false)}
      refClassname={cn('flex flex-col items-center')}
      variants={{
        closed: {
          borderRadius: 60,
        },
        open: {
          borderRadius: 16,
        },
      }}
    >
      <div className={cn('flex w-full items-center justify-between px-3 py-3')}>
        <AnimatePresence mode="popLayout">
          {open && (
            <m.nav
              animate={{ opacity: 1, x: '0%' }}
              className={cn('flex gap-2')}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0, x: '50%' }}
              transition={TRANS_SPRING}
            >
              <button
                className={cn(
                  'whitespace-nowrap rounded-md px-2 py-1 dark:bg-zinc-800',
                )}
              >
                Credit card
              </button>
              <button className={cn('whitespace-nowrap rounded-md px-2 py-1')}>
                Other methods
              </button>
            </m.nav>
          )}
        </AnimatePresence>
        <m.button
          className={cn(
            'flex cursor-default select-none items-center justify-center gap-3 self-start overflow-hidden whitespace-nowrap px-3 py-1 focus-visible:outline-none',
          )}
          layout
          onClick={handleOpen}
          transition={TRANS_SPRING}
        >
          {!open && 'Pay Now'}
          <AnimatePresence initial={false} mode="popLayout">
            <m.span
              animate={{ scale: 1 }}
              className={cn('flex w-5 items-center justify-center')}
              exit={{ scale: 0 }}
              initial={{ scale: 0 }}
              key={icon.type.name}
              transition={TRANS_SPRING_SLOW}
            >
              {icon}
            </m.span>
          </AnimatePresence>
        </m.button>
      </div>
      {content && (
        <m.div
          animate={open ? 'open' : 'closed'}
          className={cn('top-14 w-96 p-3 pt-0', { absolute: !open })}
          initial="closed"
          style={{
            originY: 'top',
          }}
          transition={{
            ...TRANS_SPRING,
            filter: {
              delay: 0.2,
            },
          }}
          variants={{
            closed: {
              filter: 'blur(4px)',
              opacity: 0,
              scaleX: 0.75,
            },
            open: {
              filter: 'blur(0px)',
              opacity: 1,
              scaleX: 1,
            },
          }}
        >
          <Card />
          {/* <div
            className={cn(
              'shadow-l h-48 rounded-xl border p-3 dark:border-zinc-700 dark:bg-zinc-800',
            )}
          >
            Labore aliqua sint ullamco amet. Mollit duis id eu. Aliquip dolor
            est non sit laborum excepteur. Cillum irure nostrud irure. Eu
            aliquip reprehenderit in incididunt officia et dolor occaecat ipsum
            et fugiat exercitation commodo.
          </div> */}
        </m.div>
      )}
    </AnimateDimension>
  );
};

const Card = () => (
  <div className={cn('card font-cc h-[200px]')}>
    <div
      className={cn(
        'card-inner h-full w-full transition-transform duration-[600ms] ease-[ease]',
      )}
    >
      {/* Front */}
      <div
        className={cn(
          'card-front relative top-0 flex h-full flex-col justify-end gap-3 overflow-hidden rounded-xl p-5',
        )}
      >
        {/* Front background */}
        <div
          className={cn(
            "card-bg absolute -top-5 right-[-120px] h-[250px] w-[380px] rounded-tl-[100%] before:absolute before:-right-20 before:-top-5 before:h-[250px] before:w-[380px] before:rounded-tl-[100%] before:content-[''] after:absolute after:-top-5 after:right-[-120px] after:h-[250px] after:w-[380px] after:rounded-tl-[100%] after:content-['']",
          )}
        />
        <svg
          className={cn('absolute right-[25px] top-[30px]')}
          fill="none"
          height="24"
          viewBox="0 0 72 24"
          width="72"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            d="M52.3973 1.01093L51.5588 5.99054C49.0448 4.56717 43.3231 4.23041 43.3231 6.85138C43.3231 7.89285 44.6177 8.60913 46.178 9.47241C48.5444 10.7817 51.5221 12.4291 51.5221 16.062C51.5221 21.8665 45.4731 24 41.4645 24C37.4558 24 34.8325 22.6901 34.8325 22.6901L35.7065 17.4848C38.1115 19.4688 45.4001 20.032 45.4001 16.8863C45.4001 15.5645 43.9656 14.785 42.3019 13.8811C40.0061 12.6336 37.2742 11.1491 37.2742 7.67563C37.2742 1.30988 44.1978 0 47.1132 0C49.8102 0 52.3973 1.01093 52.3973 1.01093ZM66.6055 23.6006H72L67.2966 0.414276H62.5732C60.3923 0.414276 59.8612 2.14215 59.8612 2.14215L51.0996 23.6006H57.2234L58.4481 20.1566H65.9167L66.6055 23.6006ZM60.1406 15.399L63.2275 6.72235L64.9642 15.399H60.1406ZM14.7942 16.3622L20.3951 0.414917H26.7181L17.371 23.6012H11.2498L6.14551 3.45825C2.83215 1.41281 0 0.807495 0 0.807495L0.108643 0.414917H9.36816C11.9161 0.414917 12.1552 2.50314 12.1552 2.50314L14.1313 12.9281L14.132 12.9294L14.7942 16.3622ZM25.3376 23.6006H31.2126L34.8851 0.414917H29.0095L25.3376 23.6006Z"
            fill="white"
            fillRule="evenodd"
          ></path>
        </svg>
        <div className={cn('absolute right-[15px] top-[55px] scale-50')}>
          <svg height="56" width="46" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m35,3a50,50 0 0,1 0,50M24,8.5a39,39 0 0,1 0,39M13.5,13.55a28.2,28.5
  0 0,1 0,28.5M3,19a18,17 0 0,1 0,18"
              fill="none"
              stroke="#f9f9f9"
              strokeLinecap="round"
              strokeWidth="6"
            ></path>
          </svg>
        </div>
        <div
          className={cn(
            'relative grid h-10 w-12 place-content-center rounded bg-[linear-gradient(to_bottom_left,_#ffecc7,_#d0b978)]',
          )}
        >
          <div className={cn('absolute top-[0.81rem] h-px w-full bg-[#333]')} />
          <div className={cn('absolute top-[1.25rem] h-px w-full bg-[#333]')} />
          <div className={cn('absolute top-[1.75rem] h-px w-full bg-[#333]')} />
          <div className={cn('absolute left-1/2 h-full w-px bg-[#333]')} />
          <div
            className={cn(
              'z-[1] h-6 w-5 rounded border border-[#333] bg-[linear-gradient(to_bottom_left,_#efdbab,_#e1cb94)]',
            )}
          />
        </div>
        <div className={cn('z-[1] flex justify-between gap-4 text-xl')}>
          <div>1234</div>
          <div>5678</div>
          <div>9000</div>
          <div>1234</div>
        </div>
        <div className={cn('z-[1] text-sm')}>John Doe</div>
        <div className={cn('absolute bottom-5 right-4 text-sm')}>12/28</div>
      </div>
      {/* Back */}
      <div
        className={cn(
          "card-back absolute top-0 z-[2] flex h-full w-[180%] w-full flex-col justify-between overflow-hidden rounded-[10px] p-4 pb-3 before:absolute before:left-[20%] before:top-[40%] before:h-[120%] before:rounded-[100%] before:bg-[linear-gradient(_to_right_top,#a3d4e7,#a7d5e6,#abd5e4,#aed6e3,#b2d6e2,#aed4e2,#abd3e1,#a7d1e1,#9bcee1,#8ecae1,#81c7e1,#73c3e1_)] before:opacity-[0.15] before:blur-[10px] before:content-[''] after:absolute after:left-0 after:right-0 after:top-5 after:h-10 after:bg-black",
        )}
      >
        <div
          className={cn(
            'relative top-2 mt-16 h-9 w-full rounded bg-white p-3 text-right text-[#000]',
          )}
        >
          <label
            className={cn(
              'text-2xs mx-0 -mt-8 mb-2 block uppercase text-white',
            )}
          >
            ccv
          </label>
          <input
            className={cn('w-[3ch] text-right focus-visible:outline-none')}
            placeholder="123"
          />
        </div>
        <div className={cn('self-end text-xs')}>
          <p>
            This card is property of Sandell Bank. If found, please return to
            Sandell Bank or to the nearest bank.
          </p>
        </div>
      </div>
    </div>
  </div>
);

const CreditCard = () => (
  <svg
    fill="none"
    height="24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect height="14" rx="2" width="20" x="2" y="5" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

const Close = () => (
  <svg
    fill="none"
    height="24"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);
