import './index.css';
import { cn } from '@/lib/utils';
import { type PropsWithChildren } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  description: 'User interface laboratory of Joonas Sandell',
  title: 'UI Lab',
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={cn(
          'grid min-h-screen place-content-center bg-zinc-100 dark:bg-zinc-950',
        )}
      >
        {children}
      </body>
    </html>
  );
}
