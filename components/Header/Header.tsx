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
        'ul-fixed ul-inset-x-0 ul-flex ul-items-center ul-justify-between ul-gap-8 ul-bg-zinc-100 ul-px-6 ul-py-4 dark:ul-bg-zinc-950',
      )}
    >
      <Link
        className={cn('ul-flex ul-items-end ul-gap-2 ul-whitespace-nowrap')}
        href="/"
      >
        UI Lab
        <span
          className={cn('ul-text-sm ul-text-zinc-500 dark:ul-text-zinc-400')}
        >
          by Joonas Sandell
        </span>
      </Link>
      <button onClick={handleThemeChange}>
        {theme === 'light' ? (
          <>
            <span className={cn('ul-sr-only')}>Dark mode</span>
            <Moon className={cn('ul-size-5')} />
          </>
        ) : (
          <>
            <span className={cn('ul-sr-only')}>Light mode</span>
            <Sun className={cn('ul-size-5')} />
          </>
        )}
      </button>
    </header>
  );
};
