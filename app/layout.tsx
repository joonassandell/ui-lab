import '@/stylesheets/index.css';
import { cn } from '@/lib/utils';
import { IframeHandler } from '@/components/IframeHandler';
import { type PropsWithChildren } from 'react';
import { ThemeProvider } from 'next-themes';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  description: 'User interface laboratory by Joonas Sandell',
  title: 'UI Laboratory',
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
        'u-bg-zinc-50 dark:u-bg-[#0A0A0B]',
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
          <IframeHandler />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
