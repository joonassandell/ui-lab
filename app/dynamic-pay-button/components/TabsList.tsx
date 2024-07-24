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
            className={cn('ul-flex ul-gap-1')}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0, x: '50%' }}
            transition={TRANS_SPRING}
          >
            {TABS.map(item => (
              <Tab
                className={cn(
                  'ul-relative ul-whitespace-nowrap ul-rounded-lg ul-px-2 ul-py-1 ul-transition-colors',
                  'hover:ul-text-zinc-800 dark:hover:ul-text-white',
                  {
                    'ul-text-zinc-800 dark:ul-text-white':
                      item.label === selectedTab,
                  },
                )}
                key={item.label}
                value={item.label}
              >
                <div className={cn('ul-relative ul-z-10')}>{item.label}</div>
                {item.label === selectedTab && (
                  <m.div
                    className={cn(
                      'ul-absolute ul-inset-0 ul-z-0 ul-rounded-lg ul-border',
                      'ul-border-transparent ul-bg-zinc-200/60',
                      'dark:ul-border-zinc-700/40 dark:ul-bg-zinc-800',
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
