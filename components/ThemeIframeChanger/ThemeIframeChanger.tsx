'use client';

import { ALLOWED_IFRAME_URL } from '@/lib/config';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export const ThemeIframeChanger = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.origin !== ALLOWED_IFRAME_URL) return;
      setTheme(event.data);
    };

    window.addEventListener('message', handler);

    return () => window.removeEventListener('message', handler);
  }, [setTheme]);

  return null;
};
