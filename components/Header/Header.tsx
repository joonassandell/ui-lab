'use client';

import { cn } from '@/lib/utils';
import { type HeaderProps } from './';
import { Moon, Sun } from '@/components/Icon';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import Link from 'next/link';

const Header = ({ displayWithQueryParamOnly }: HeaderProps) => {
  const queryParam = useSearchParams().get('header') === 'true';
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  const handleThemeChange = () =>
    setTheme(theme === 'light' ? 'dark' : 'light');

  useEffect(() => setMounted(true), []);

  if ((displayWithQueryParamOnly && !queryParam) ?? !mounted) {
    return null;
  }

  return (
    <header
      className={cn(
        'u-fixed u-inset-x-0 u-flex u-items-center u-justify-between u-gap-8 u-px-6 u-py-4',
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

const HeaderSuspense = ({ ...props }: HeaderProps) => {
  return (
    <Suspense>
      <Header {...props} />
    </Suspense>
  );
};

export { HeaderSuspense as Header };
