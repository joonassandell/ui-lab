'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { TRANS_SPRING } from '@/lib/config';
import { useState } from 'react';

export const DynamicPayButton = () => {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
    setContent(true);
  };

  return (
    <motion.div
      animate={open ? 'open' : 'closed'}
      className={cn(
        'shadow-pop fle flex-co items-cente relative overflow-hidden bg-zinc-50 p-3 text-sm font-medium text-slate-500 focus-visible:outline-none dark:bg-zinc-900 dark:text-slate-50',
      )}
      initial="closed"
      layout
      onLayoutAnimationComplete={() => {
        !open && setContent(false);
      }}
      transition={TRANS_SPRING}
      variants={{
        closed: {
          borderRadius: 60,
        },
        open: {
          borderRadius: 16,
        },
      }}
    >
      <motion.button
        className={cn(
          'inline-flex cursor-default select-none items-center justify-center self-start whitespace-nowrap px-3',
        )}
        layout
        onClick={handleOpen}
      >
        Pay now
        <ShoppingBag />
      </motion.button>
      {content && (
        <motion.div
          className={cn('mt-3 w-96', {
            absolute: !open,
          })}
          layout="position"
          // style={{
          //   originX: open ? 'center' : undefined,
          // }}
        >
          <motion.div
            animate={open ? 'open' : 'closed'}
            className={cn('relative')}
            initial="closed"
            style={{
              left: '-8.5rem',
              x: '0rem',
            }}
            transition={TRANS_SPRING}
            variants={{
              closed: {
                filter: 'blur(8px)',
                scaleX: 0.66,
                y: '2rem',
              },
              open: {
                filter: 'blur(0px)',
                scaleX: 1,
                x: '8.5rem',
                y: '0rem',
              },
            }}
          >
            <div
              className={cn(
                'shadow-l h-48 rounded-xl border border-zinc-700 p-2 dark:bg-zinc-800',
              )}
            >
              Labore aliqua sint ullamco amet. Mollit duis id eu. Aliquip dolor
              est non sit laborum excepteur. Cillum irure nostrud irure. Eu
              aliquip reprehenderit in incididunt officia et dolor occaecat
              ipsum et fugiat exercitation commodo.
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

const ShoppingBag = () => (
  <svg
    className={cn('ml-3 w-5')}
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
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
