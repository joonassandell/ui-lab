import '@/stylesheets/index.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/Header';
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
        'ul-antialiased',
        'ul-bg-zinc-100 dark:ul-bg-zinc-950',
        'ul-text-zinc-800 dark:ul-text-white',
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
          value={{ dark: 'ul-dark' }}
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
