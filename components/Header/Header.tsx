'use client';

import { cn } from '@/lib/utils';
import { type HeaderProps } from './Header.types';
import { Moon, Sun } from '@/components/Icon';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import Link from 'next/link';

const Header = ({ queryParamOnly }: HeaderProps) => {
  const { setTheme, theme } = useTheme();
  const queryParam = useSearchParams().get('header') === 'true';

  const handleThemeChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (queryParamOnly && !queryParam) {
    return null;
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 flex items-center justify-between gap-8 px-6 py-4',
      )}
    >
      <Link className={cn('flex items-end gap-2 whitespace-nowrap')} href="/">
        UI Lab
        <span className={cn('text-sm text-zinc-500 dark:text-zinc-400')}>
          by Joonas Sandell
        </span>
      </Link>
      <button onClick={handleThemeChange}>
        {theme === 'light' ? (
          <>
            <span className={cn('sr-only')}>Dark mode</span>
            <Moon className={cn('size-5')} />
          </>
        ) : (
          <>
            <span className={cn('sr-only')}>Light mode</span>
            <Sun className={cn('size-5')} />
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
