'use client';

import { ALLOWED_IFRAME_URLS, REDIRECT_URL } from '@/lib/config';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export const IframeHandler = () => {
  const { setTheme } = useTheme();

  /**
   * Handle theme changing from iframe
   */
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (!ALLOWED_IFRAME_URLS?.split(', ').includes(event.origin)) return;
      setTheme(event.data);
    };

    window.addEventListener('message', handler);

    return () => window.removeEventListener('message', handler);
  }, [setTheme]);

  /**
   * Redirect unless used in an iframe
   */
  useEffect(() => {
    if (!REDIRECT_URL) return;
    if (window.self === window.top && REDIRECT_URL != 'false') {
      redirect(REDIRECT_URL);
    }
  }, []);

  return null;
};
