import '@/stylesheets/index.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/Header';
import { type PropsWithChildren } from 'react';
import { ThemeProvider } from 'next-themes';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  description: 'User interface laboratory by Joonas Sandell',
  title: 'UI Lab',
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  width: 'device-width',
};

export default function Layout({ children }: PropsWithChildren) {
  return (
    <html
      className={cn(
        'u-antialiased',
        'u-bg-zinc-100 dark:u-bg-zinc-950',
        'u-text-zinc-800 dark:u-text-white',
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
          value={{ dark: 'u-dark' }}
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
