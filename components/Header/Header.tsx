'use client';

import { cn } from '@/lib/utils';
import { Moon, Sun } from '@/components/Icon';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  const handleThemeChange = () =>
    setTheme(theme === 'light' ? 'dark' : 'light');

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <header
      className={cn(
        'u-fixed u-inset-x-0 u-flex u-items-center u-justify-between u-gap-8 u-bg-zinc-100 u-px-6 u-py-4 dark:u-bg-zinc-950',
      )}
    >
      <Link
        className={cn('u-flex u-items-end u-gap-2 u-whitespace-nowrap')}
        href="/"
      >
        UI Lab
        <span className={cn('u-text-sm u-text-zinc-500 dark:u-text-zinc-400')}>
          by Joonas Sandell
        </span>
      </Link>
      <button onClick={handleThemeChange}>
        {theme === 'light' ? (
          <>
            <span className={cn('u-sr-only')}>Dark mode</span>
            <Moon className={cn('u-size-5')} />
          </>
        ) : (
          <>
            <span className={cn('u-sr-only')}>Light mode</span>
            <Sun className={cn('u-size-5')} />
          </>
        )}
      </button>
    </header>
  );
};
