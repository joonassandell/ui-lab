import { AnimatePresence, m } from 'framer-motion';
import { cn } from '@/lib/utils';
import { List, Trigger as Tab } from '@radix-ui/react-tabs';
import { TABS, useDynamicPayButton } from '../';
import { TRANS_SPRING, TRANS_SPRING_FAST } from '@/lib/config';

export const TabsList = () => {
  const { open, selectedTab } = useDynamicPayButton();

  return (
    <AnimatePresence mode="popLayout">
      {open && (
        <List asChild>
          <m.div
            animate={{ opacity: 1, x: '0%' }}
            className={cn('u-flex u-gap-1')}
            exit={{ opacity: 0, transition: TRANS_SPRING_FAST }}
            initial={{ opacity: 0, x: '50%' }}
            transition={{ ...TRANS_SPRING, delay: 0.07 }}
          >
            {TABS.map(item => (
              <Tab
                className={cn(
                  'u-relative u-whitespace-nowrap u-rounded-lg u-px-2 u-py-1 u-transition-colors',
                  'hover:u-text-zinc-800 dark:hover:u-text-white',
                  'active:u-scale-[0.95]',
                  {
                    'u-text-zinc-800 dark:u-text-white':
                      item.label === selectedTab,
                  },
                )}
                key={item.label}
                value={item.label}
              >
                <div className={cn('u-relative u-z-10')}>{item.label}</div>
                {item.label === selectedTab && (
                  <m.div
                    className={cn(
                      'u-absolute u-inset-0 u-z-0 u-rounded-lg u-border',
                      'u-border-transparent u-bg-zinc-200/60',
                      'dark:u-border-zinc-700/40 dark:u-bg-zinc-800',
                    )}
                    layoutId="bg"
                    transition={TRANS_SPRING}
                  />
                )}
              </Tab>
            ))}
          </m.div>
        </List>
      )}
    </AnimatePresence>
  );
};
