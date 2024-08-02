'use client';

import { ALLOWED_IFRAME_URLS } from '@/lib/config';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export const ThemeIframeChanger = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (!ALLOWED_IFRAME_URLS?.split(', ').includes(event.origin)) return;
      setTheme(event.data);
    };

    window.addEventListener('message', handler);

    return () => window.removeEventListener('message', handler);
  }, [setTheme]);

  return null;
};
