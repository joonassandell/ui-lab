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
    <html className={cn('overflow-auto antialiased')} lang="en">
      <body
        className={cn(
          'grid min-h-screen place-content-center overflow-hidden bg-zinc-100 dark:bg-zinc-950',
        )}
      >
        {children}
      </body>
    </html>
  );
}
