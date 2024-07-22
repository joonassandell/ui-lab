import { AnimatePresence, m } from 'framer-motion';
import { cn } from '@/lib/utils';
import { List, Trigger as Tab } from '@radix-ui/react-tabs';
import { TABS, useDynamicPayButton } from './';
import { TRANS_SPRING, TRANS_SPRING_FAST } from '@/lib/config';

export const TabsList = () => {
  const { open, selectedTab } = useDynamicPayButton();

  return (
    <AnimatePresence mode="popLayout">
      {open && (
        <List asChild>
          <m.div
            animate={{ opacity: 1, x: '0%' }}
            className={cn('flex gap-1')}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0, x: '50%' }}
            transition={TRANS_SPRING}
          >
            {TABS.map(item => (
              <Tab
                className={cn(
                  'relative cursor-default whitespace-nowrap rounded-lg px-2 py-1 transition-colors',
                  'hover:text-zinc-800 dark:hover:text-white',
                  {
                    'text-zinc-800 dark:text-white': item.label === selectedTab,
                  },
                )}
                key={item.label}
                value={item.label}
              >
                <div className={cn('relative z-10')}>{item.label}</div>
                {item.label === selectedTab && (
                  <m.div
                    className={cn(
                      'absolute inset-0 z-0 rounded-lg border',
                      'border-transparent bg-zinc-200/60',
                      'dark:border-zinc-700/40 dark:bg-zinc-800',
                    )}
                    layoutId="bg"
                    transition={TRANS_SPRING_FAST}
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
