import '@/stylesheets/global.css';
import { cn } from '@/lib/utils';
import { type PropsWithChildren } from 'react';
import { ThemeProvider } from 'next-themes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  description: 'User interface laboratory of Joonas Sandell',
  title: 'UI Lab',
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html
      className={cn(
        'antialiased',
        'bg-zinc-100 dark:bg-zinc-950',
        'text-zinc-800 dark:text-white',
      )}
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
